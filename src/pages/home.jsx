import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/HeroSection";
import FeatureOverview from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/testimonials";
import ImpactStats from "../components/impactstats";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeatureOverview />
      <HowItWorks />
      <Testimonials />
      <ImpactStats />
    </div>
  );
};

export default Home;
