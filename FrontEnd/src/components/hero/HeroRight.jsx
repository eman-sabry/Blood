import { MdOutlineNotificationsActive, MdLocalHospital } from "react-icons/md";
import FeatureCard from "./FeatureCard";

const CARDS = [
  {
    icon: <MdOutlineNotificationsActive className="text-white text-3xl" />,
    title: "For Donors",
    desc: "Get real-time alerts when blood is needed near you",
  },
  {
    icon: <MdLocalHospital className="text-white text-3xl" />,
    title: "For Hospitals",
    desc: "Find and request the exact blood type you need instantly",
  },
];

const HeroRight = () => (
  <div className="flex flex-col gap-10">
    {CARDS.map((card) => (
      <FeatureCard key={card.title} {...card} />
    ))}
    
  </div>
);

export default HeroRight;
