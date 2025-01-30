import { MultipleChoiceExercise } from "@/data/passages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface MultipleChoiceExerciseProps {
  exercises: MultipleChoiceExercise[];
  answers: string[];
  setAnswers: (answers: string[]) => void;
}

export function MultipleChoiceExercise({ exercises, answers, setAnswers }: MultipleChoiceExerciseProps) {
  const checkAnswers = () => {
    const correct = exercises.map((q, i) => 
      q.correctAnswer === answers[i]
    );
    const score = correct.filter(Boolean).length;
    toast(`You got ${score} out of ${exercises.length} correct!`);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {exercises.map((exercise, index) => (
            <div key={index} className="space-y-2">
              <p>{exercise.question}</p>
              <div className="space-y-2">
                {exercise.options.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                      className="h-4 w-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={checkAnswers}>
            Check Answers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}