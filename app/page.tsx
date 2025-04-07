import Navbar from "./components/navbar/page";
import Hero from "./components/hero/page";
import About from "./components/about/page";
import Services from "./components/services/page";
import Testimonials from "./components/testimonials/page";
import Consultation from "./components/consultation/page";
import Footer from "./components/footer/page";
import WhyChoose8Senses from "./components/ChooseSection/page";

export default function Home() {
  return (
    <main className="pt-[6rem]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <WhyChoose8Senses/> 
      <Consultation />
      <Footer />
    </main>
  );
}
