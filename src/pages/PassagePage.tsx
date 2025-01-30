import { passages } from "@/data/passages";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

  const [fillBlankAnswers, setFillBlankAnswers] = useState<string[]>(
    new Array(passage?.fillBlanks.length || 0).fill("")
  );
  const [matchingAnswers, setMatchingAnswers] = useState<number[]>(
    new Array(passage?.matching.length || 0).fill(-1)
  );
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState<string[]>(
    new Array(passage?.multipleChoice.length || 0).fill("")
  );
  const [shortAnswers, setShortAnswers] = useState<string[]>(
    new Array(passage?.shortAnswer.length || 0).fill("")
  );

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

      <Tabs defaultValue="fill-blanks" className="w-full mt-8">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="fill-blanks">Fill Blanks</TabsTrigger>
          <TabsTrigger value="matching">Matching</TabsTrigger>
          <TabsTrigger value="multiple-choice">Multiple Choice</TabsTrigger>
          <TabsTrigger value="short-answer">Short Answer</TabsTrigger>
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