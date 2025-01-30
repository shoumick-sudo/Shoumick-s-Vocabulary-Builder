import { passages } from "@/data/passages";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, PencilLine, Shuffle, Radio, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { PassageContent } from "@/components/PassageContent";
import { FillBlanksExercise } from "@/components/exercises/FillBlanksExercise";
import { MatchingExercise } from "@/components/exercises/MatchingExercise";
import { MultipleChoiceExercise } from "@/components/exercises/MultipleChoiceExercise";
import { ShortAnswerExercise } from "@/components/exercises/ShortAnswerExercise";

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

  return (
    <div className="container max-w-4xl py-8 animate-fade-in">
      <Link to="/">
        <Button variant="ghost" className="mb-6 group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Passages
        </Button>
      </Link>

      <PassageContent 
        title={passage.title}
        content={passage.content}
        vocabulary={passage.vocabulary}
      />

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
          <FillBlanksExercise
            exercises={passage.fillBlanks}
            answers={fillBlankAnswers}
            setAnswers={setFillBlankAnswers}
          />
        </TabsContent>

        <TabsContent value="matching">
          <MatchingExercise
            exercises={passage.matching}
            answers={matchingAnswers}
            setAnswers={setMatchingAnswers}
          />
        </TabsContent>

        <TabsContent value="multiple-choice">
          <MultipleChoiceExercise
            exercises={passage.multipleChoice}
            answers={multipleChoiceAnswers}
            setAnswers={setMultipleChoiceAnswers}
          />
        </TabsContent>

        <TabsContent value="short-answer">
          <ShortAnswerExercise
            exercises={passage.shortAnswer}
            answers={shortAnswers}
            setAnswers={setShortAnswers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}