import { Word } from "@/data/passages";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VocabularyWordProps {
  word: Word;
}

export function VocabularyWord({ word }: VocabularyWordProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help font-medium text-primary underline decoration-dotted">
            {word.word}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{word.definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}