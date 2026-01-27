import dynamic from "next/dynamic";

export const revalidate = 60;

/* const HomeHero = dynamic(() => import("@/components/sections/HomeHero"));
const   WhoAreYou = dynamic(() => import("@/components/sections/WhoAreYou"));
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
); */

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
