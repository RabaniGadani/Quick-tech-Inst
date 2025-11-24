import Hero from "@/components/Hero";
import About from "@/components/About";
import ImageSlider from "@/components/ImageSlider";
import Courses from "@/components/Courses";
import Teachers from "@/components/Teachers";
import BoardsSection from "@/components/BoardsSection";
import SanjhaLibrary from "@/components/SanjhaLibrary";


export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About/>
      <ImageSlider/>
      <Courses/>
      <Teachers />
      <BoardsSection />
      <SanjhaLibrary />
    </main>
  );
}


