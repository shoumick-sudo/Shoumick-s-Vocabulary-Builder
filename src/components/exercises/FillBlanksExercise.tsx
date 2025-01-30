import type { FillBlankExercise as FillBlankExerciseType } from "@/data/passages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface FillBlanksExerciseProps {
  exercises: FillBlankExerciseType[];
  answers: string[];
  setAnswers: (answers: string[]) => void;
}

export function FillBlanksExercise({ exercises, answers, setAnswers }: FillBlanksExerciseProps) {
  const checkAnswers = () => {
    const correct = exercises.map((q, i) => 
      q.answer.toLowerCase() === answers[i].toLowerCase()
    );
    const score = correct.filter(Boolean).length;
    toast(`You got ${score} out of ${exercises.length} correct!`);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <div key={index} className="space-y-2">
              <p>{exercise.question}</p>
              <Input
                value={answers[index]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                placeholder="Type your answer..."
              />
            </div>
          ))}
          <Button onClick={checkAnswers} className="mt-4">
            Check Answers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}