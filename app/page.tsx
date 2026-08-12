import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import StudioAtmosphere from "@/components/StudioAtmosphere";
import Services from "@/components/Services";
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
        <Hero />
        <Portfolio />
        <StudioAtmosphere />
        <Services />
        <Pricing />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
