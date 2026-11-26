import HeroSection from "../Components/About/Herosection";
import Mission from "../Components/About/Mission";
import FounderSection from "../Components/home/FounderSection";
import ManagedSections from "../Components/ManagedSections";

const About = () => {
  return (
    <main>
      <HeroSection />
      <FounderSection />
      <Mission />
      <ManagedSections page="about" />
    </main>
  );
};

export default About;
