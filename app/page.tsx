import Navbar from "@/components/Navbar";
import HeroDynamic from "@/components/HeroDynamic";
import Portfolio from "@/components/Portfolio";
import { Skiper30 } from "@/components/animations/Skiper30";
import StudioAtmosphere from "@/components/StudioAtmosphere";
import Services from "@/components/Services";
import { Skiper17 } from "@/components/animations/StickyCard002";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroDynamic />
        <Portfolio />
        <Skiper30 />
        <StudioAtmosphere />
        <Services />
        <Skiper17 />
        <Pricing />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
