import { ShortAnswerExercise } from "@/data/passages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ShortAnswerExerciseProps {
  exercises: ShortAnswerExercise[];
  answers: string[];
  setAnswers: (answers: string[]) => void;
}

export function ShortAnswerExercise({ exercises, answers, setAnswers }: ShortAnswerExerciseProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {exercises.map((exercise, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium">{exercise.question}</p>
              <Input
                value={answers[index]}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
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
  );
}