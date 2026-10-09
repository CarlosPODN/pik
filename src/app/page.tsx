import Home from "./_components/Home";
import LandingActions from "./_components/LandingActions/LandingActions";
import LandingHero from "./_components/LandingHero/LandingHero";
import LandingPage from "./_components/LandingPage/LandingPage";

export default function HomePage() {
  return (
    <Home
      landing={
        <LandingPage>
          <LandingHero />
          <LandingActions />
        </LandingPage>
      }
    />
  );
}
