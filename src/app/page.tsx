import LandingActions from "./_components/LandingActions/LandingActions";
import LandingHero from "./_components/LandingHero";
import LandingPage from "./_components/LandingPage";

export default function Home() {
  return (
    <LandingPage>
      <LandingHero />
      <LandingActions />
    </LandingPage>
  );
}
