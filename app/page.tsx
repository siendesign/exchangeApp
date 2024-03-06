import { TypewriterEffectSmoothDemo } from "./components/Hero";
import Footer from "./mycomponents/Footer";
import Navbar from "./mycomponents/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col justify-between min-h-screen">
     
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <TypewriterEffectSmoothDemo />
      </div>
      <Footer/>
    </main>
  );
}
