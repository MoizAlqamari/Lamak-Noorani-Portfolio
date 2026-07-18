"use client";

import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import About from "@/components/About";
import Social from "@/components/Social";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <Services />
      <About />
      <Social />
      <FAQ />
      <Footer />
    </>
  );
}