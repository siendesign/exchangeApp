import { TypewriterEffectSmoothDemo } from "./components/Hero";
import Navbar from "./mycomponents/Navbar";

export default function Home() {
  return (
    <main className="">
     
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <TypewriterEffectSmoothDemo />
      </div>
      
    </main>
  );
}
