import { passages } from "@/data/passages";
import { VocabularyWord } from "@/components/VocabularyWord";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, PencilLine, Shuffle, Radio, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PassagePage() {
  const { id } = useParams();
  const passage = passages.find((p) => p.id === id);
  const [fillBlankAnswers, setFillBlankAnswers] = useState<string[]>(Array(5).fill(""));
  const [matchingAnswers, setMatchingAnswers] = useState<number[]>(Array(10).fill(-1));
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<string[]>(Array(5).fill(""));
  const [shortAnswers, setShortAnswers] = useState<string[]>(Array(5).fill(""));

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

  const checkFillBlankAnswers = () => {
    const correct = passage.fillBlanks.map((q, i) => 
      q.answer.toLowerCase() === fillBlankAnswers[i].toLowerCase()
    );
    const score = correct.filter(Boolean).length;
    toast(`You got ${score} out of ${passage.fillBlanks.length} correct!`);
  };

  const checkMatchingAnswers = () => {
    const correct = passage.matching.map((q, i) => 
      q.correctIndex === matchingAnswers[i]
    );
    const score = correct.filter(Boolean).length;
    toast(`You got ${score} out of ${passage.matching.length} correct!`);
  };

  const checkMultipleChoiceAnswers = () => {
    const correct = passage.multipleChoice.map((q, i) => 
      q.correctAnswer === multipleChoiceAnswers[i]
    );
    const score = correct.filter(Boolean).length;
    toast(`You got ${score} out of ${passage.multipleChoice.length} correct!`);
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

      <Tabs defaultValue="fill-blanks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fill-blanks" className="flex items-center gap-2">
            <PencilLine className="h-4 w-4" />
            Fill Blanks
          </TabsTrigger>
          <TabsTrigger value="matching" className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            Matching
          </TabsTrigger>
          <TabsTrigger value="multiple-choice" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            Multiple Choice
          </TabsTrigger>
          <TabsTrigger value="short-answer" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Short Answer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fill-blanks">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {passage.fillBlanks.map((exercise, index) => (
                  <div key={index} className="space-y-2">
                    <p>{exercise.question}</p>
                    <Input
                      value={fillBlankAnswers[index]}
                      onChange={(e) => {
                        const newAnswers = [...fillBlankAnswers];
                        newAnswers[index] = e.target.value;
                        setFillBlankAnswers(newAnswers);
                      }}
                      placeholder="Type your answer..."
                    />
                  </div>
                ))}
                <Button onClick={checkFillBlankAnswers} className="mt-4">
                  Check Answers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matching">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {passage.matching.map((exercise, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-medium">{exercise.word}</span>
                      <Input
                        type="number"
                        min="0"
                        max="9"
                        value={matchingAnswers[index] === -1 ? "" : matchingAnswers[index]}
                        onChange={(e) => {
                          const newAnswers = [...matchingAnswers];
                          newAnswers[index] = parseInt(e.target.value) || -1;
                          setMatchingAnswers(newAnswers);
                        }}
                        placeholder="?"
                        className="w-16"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {passage.matching.map((exercise, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-medium">{index}.</span>
                      <span>{exercise.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={checkMatchingAnswers} className="mt-4">
                Check Answers
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multiple-choice">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {passage.multipleChoice.map((exercise, index) => (
                  <div key={index} className="space-y-2">
                    <p>{exercise.question}</p>
                    <div className="space-y-2">
                      {exercise.options.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={multipleChoiceAnswers[index] === option}
                            onChange={(e) => {
                              const newAnswers = [...multipleChoiceAnswers];
                              newAnswers[index] = e.target.value;
                              setMultipleChoiceAnswers(newAnswers);
                            }}
                            className="h-4 w-4"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <Button onClick={checkMultipleChoiceAnswers}>
                  Check Answers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="short-answer">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {passage.shortAnswer.map((exercise, index) => (
                  <div key={index} className="space-y-2">
                    <p className="font-medium">{exercise.question}</p>
                    <Input
                      value={shortAnswers[index]}
                      onChange={(e) => {
                        const newAnswers = [...shortAnswers];
                        newAnswers[index] = e.target.value;
                        setShortAnswers(newAnswers);
                      }}
                      placeholder="Type your answer..."
                    />
                    <Button
                      variant="outline"
                      onClick={() => toast("Sample answer: " + exercise.sampleAnswer)}
                      size="sm"
                    >
                      View Sample Answer
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}