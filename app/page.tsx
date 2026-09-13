import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { GranDia } from "@/components/GranDia";
import { Timeline } from "@/components/Timeline";
import { Autobuses } from "@/components/Autobuses";
import { Alojamiento } from "@/components/Alojamiento";
import { Regalos } from "@/components/Regalos";
import { Contacto } from "@/components/Contacto";
import { RsvpForm } from "@/components/RsvpForm";
import { Footer } from "@/components/Footer";
import { SectionReveal } from "@/components/SectionReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionReveal>
          <Intro />
        </SectionReveal>
        <SectionReveal>
          <GranDia />
        </SectionReveal>
        <SectionReveal>
          <Timeline />
        </SectionReveal>
        <SectionReveal>
          <Autobuses />
        </SectionReveal>
        <SectionReveal>
          <Alojamiento />
        </SectionReveal>
        <SectionReveal>
          <Regalos />
        </SectionReveal>
        <SectionReveal>
          <Contacto />
        </SectionReveal>
        <SectionReveal>
          <RsvpForm />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
