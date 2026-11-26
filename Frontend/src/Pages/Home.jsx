import HeroSection from "../Components/home/HeroSection";
import ProgramsPreview from "../Components/home/ProgramsPreview";
import FounderSection from "../Components/home/FounderSection";
import ImpactSection from "../Components/home/ImpactSection";
import SuccessStories from "../Components/home/SuccessStories";
import HomeCTA from "../Components/home/HomeCTA";
import ManagedSections from "../Components/ManagedSections";

const Home = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <HeroSection />

      <ProgramsPreview />
      <FounderSection />
      <ImpactSection />
      <SuccessStories />
      <HomeCTA />
      <ManagedSections page="home" />
    </main>
  );
};

export default Home;
