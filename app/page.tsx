import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { GranDia } from "@/components/GranDia";
import { Timeline } from "@/components/Timeline";
import { Autobuses } from "@/components/Autobuses";
import { Alojamiento } from "@/components/Alojamiento";
import { DressCode } from "@/components/DressCode";
import { Regalos } from "@/components/Regalos";
import { Contacto } from "@/components/Contacto";
import { RsvpForm } from "@/components/RsvpForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <GranDia />
        <Timeline />
        <Autobuses />
        <Alojamiento />
        <DressCode />
        <Regalos />
        <Contacto />
        <RsvpForm />
      </main>
      <Footer />
    </>
  );
}
