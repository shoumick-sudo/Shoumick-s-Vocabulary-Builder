import { passages } from "@/data/passages";
import { VocabularyWord } from "@/components/VocabularyWord";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      return <p key={i} className="mb-4">{content}</p>;
    });
  };

  return (
    <div className="container py-8 animate-fade-in">
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Passages
        </Button>
      </Link>
      
      <h1 className="mb-8 text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {passage.title}
      </h1>

      <div className="prose prose-lg max-w-none">
        {highlightVocabulary(passage.content)}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Vocabulary</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {passage.vocabulary.map((word) => (
            <div key={word.word} className="p-4 rounded-lg bg-gray-50">
              <VocabularyWord word={word} />
              <p className="mt-2 text-sm text-gray-600">{word.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}