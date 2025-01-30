import { passages } from "@/data/passages";
import { VocabularyWord } from "@/components/VocabularyWord";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PassagePage() {
  const { id } = useParams();
  const passage = passages.find((p) => p.id === id);

  if (!passage) {
    return <div>Passage not found</div>;
  }

  const highlightVocabulary = (text: string) => {
    let result = text;
    passage.vocabulary.forEach((word) => {
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
    <div className="container max-w-4xl py-8 animate-fade-in">
      <Link to="/">
        <Button variant="ghost" className="mb-6 group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Passages
        </Button>
      </Link>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {passage.title}
            </h1>
          </div>

          <ScrollArea className="h-[calc(100vh-20rem)] pr-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {highlightVocabulary(passage.content)}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}