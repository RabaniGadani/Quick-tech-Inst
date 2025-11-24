
import { tracks } from "@/components/data/main/tracks";
import { notFound } from "next/navigation";

export default function TrackPage({ params }: { params: { id: string } }) {
  const track = tracks.find((t) => t.id === params.id);

  if (!track) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{track.text}</h1>
      <p className="text-lg">
        This is a placeholder for the details of the {track.text} course.
      </p>
    </div>
  );
}
