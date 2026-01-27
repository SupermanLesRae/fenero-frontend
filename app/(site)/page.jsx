export const revalidate = 60;

import HomeHero from "@/components/sections/HomeHero";
import WhoAreYou from "@/components/sections/WhoAreYou";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <WhoAreYou />
      <Testimonials />
    </main>
  );
}
