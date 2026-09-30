import Image from "next/image";
import BannerSection from "./compontents/home-compontents/BannerSection";
import FeaturedActivities from "./compontents/home-compontents/FeaturedActivities";
import LatestJourneys from "./compontents/home-compontents/LatestJourneys";
import RunningFeature from "./compontents/home-compontents/RunningFeature";
import GalleryPreview from "./compontents/home-compontents/GalleryPreview";
import FeaturedStory from "./compontents/home-compontents/FeaturedStory";
import AdventuresMap from "./compontents/home-compontents/AdventuresMap";
import AboutSection from "./compontents/home-compontents/AboutSection";

export default function Home() {
  return (
      <div className="bg-cream text-charcoal">
        <BannerSection />
        <FeaturedActivities />
        <LatestJourneys />
        <RunningFeature />
        <GalleryPreview />
        <FeaturedStory />
        <AdventuresMap /> 
        <AboutSection />
    </div>
  );
}
