import { getSlides } from "@/lib/content";
import { LandingPage } from "@/components/landing-page";

export default function Home() {
  const firstSlide = getSlides()[0];
  return <LandingPage firstSlideHref={firstSlide?.href ?? "/"} />;
}
