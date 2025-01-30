import { MatchingExercise } from "@/data/passages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface MatchingExerciseProps {
  exercises: MatchingExercise[];
  answers: number[];
  setAnswers: (answers: number[]) => void;
}

export function MatchingExercise({ exercises, answers, setAnswers }: MatchingExerciseProps) {
  const checkAnswers = () => {
    const correct = exercises.map((q, i) => 
      q.correctIndex === answers[i]
    );
    const score = correct.filter(Boolean).length;
    toast(`You got ${score} out of ${exercises.length} correct!`);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{exercise.word}</span>
                <Input
                  type="number"
                  min="0"
                  max="9"
                  value={answers[index] === -1 ? "" : answers[index]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = parseInt(e.target.value) || -1;
                    setAnswers(newAnswers);
                  }}
                  placeholder="?"
                  className="w-16"
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{index}.</span>
                <span>{exercise.definition}</span>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={checkAnswers} className="mt-4">
          Check Answers
        </Button>
      </CardContent>
    </Card>
  );
}