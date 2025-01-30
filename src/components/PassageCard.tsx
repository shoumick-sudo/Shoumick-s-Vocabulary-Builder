import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Passage } from "@/data/passages";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface PassageCardProps {
  passage: Passage;
}

export function PassageCard({ passage }: PassageCardProps) {
  return (
    <Link to={`/passage/${passage.id}`} className="block transition-transform hover:scale-105">
      <Card className="h-full bg-gradient-to-br from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10">
        <CardHeader className="flex flex-row items-center gap-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <CardTitle className="text-xl">{passage.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-gray-600">
            {passage.content.split(" ").slice(0, 20).join(" ")}...
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}