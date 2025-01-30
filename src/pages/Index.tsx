import { passages } from "@/data/passages";
import { PassageCard } from "@/components/PassageCard";

export default function Index() {
  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="mb-8 text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Vocabulary Learning
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {passages.map((passage) => (
          <PassageCard key={passage.id} passage={passage} />
        ))}
      </div>
    </div>
  );
}