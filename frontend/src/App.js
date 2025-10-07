import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import Problems from "./components/Problems";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Hero />
      <Problems />
      <Solution />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
