import { getSession } from "@/lib/session";
import Dashboard from "./_components/Dashboard/Dashboard";
import LandingActions from "./_components/LandingActions/LandingActions";
import LandingHero from "./_components/LandingHero/LandingHero";
import LandingPage from "./_components/LandingPage/LandingPage";

// The landing while logged out, the role's dashboard after, from the session cookie.
export default async function HomePage() {
  const session = await getSession();

  if (session) return <Dashboard role={session.role} />;

  return (
    <LandingPage>
      <LandingHero />
      <LandingActions />
    </LandingPage>
  );
}
