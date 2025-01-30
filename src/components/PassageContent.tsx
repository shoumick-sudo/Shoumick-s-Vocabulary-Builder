import { VocabularyWord } from "@/components/VocabularyWord";
import { Word } from "@/data/passages";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";

interface PassageContentProps {
  title: string;
  content: string;
  vocabulary: Word[];
}

export function PassageContent({ title, content, vocabulary }: PassageContentProps) {
  const highlightVocabulary = (text: string) => {
    let result = text;
    vocabulary.forEach((word) => {
      const regex = new RegExp(`\\b${word.word}\\b`, "gi");
      result = result.replace(
        regex,
        `<vocabulary-word data-word="${word.word}" data-definition="${word.definition}"></vocabulary-word>`
      );
    });

    return result.split("\n\n").map((paragraph, i) => {
      const content = paragraph.split(/<vocabulary-word.*?<\/vocabulary-word>|[^<]+/g)
        .filter(Boolean)
        .map((part, j) => {
          if (part.startsWith("<vocabulary-word")) {
            const word = part.match(/data-word="([^"]+)"/)?.[1];
            const definition = part.match(/data-definition="([^"]+)"/)?.[1];
            if (word && definition) {
              return <VocabularyWord key={j} word={{ word, definition }} />;
            }
          }
          return part;
        });

      return <p key={i} className="mb-6 leading-7 text-foreground/90">{content}</p>;
    });
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        <ScrollArea className="h-[calc(100vh-20rem)] pr-6">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {highlightVocabulary(content)}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}