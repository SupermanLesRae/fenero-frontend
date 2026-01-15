'use client";';

import HomeHero from "@/components/sections/HomeHero";
import Testimonials from "@/components/sections/Testimonials";
import WhoAreYou from "@/components/sections/WhoAreYou";

export const revalidate = 60;

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <WhoAreYou />
      <Testimonials />
    </div>
  );
}
