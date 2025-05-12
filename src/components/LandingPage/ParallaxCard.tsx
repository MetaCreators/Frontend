import FeatureCard from "./FeatureCard";

type Tab = {
  id: number;
  color: string;
  title: string;
  description: string;
};

const tabs: Tab[] = [
  {
    id: 1,
    color: 'bg-lithouse-green',
    title: 'AI Script Generator',
    description: 'Create compelling scripts that keep viewers engaged throughout your video — tailored to your unique style and voice.',
  },
  {
    id: 2,
    color: 'bg-lithouse-purple',
    title: 'Video Description Builder',
    description: 'Generate SEO-optimized video descriptions with smart keyword integration to help your content rank higher.',
  },
  {
    id: 3,
    color: 'bg-lithouse-pink',
    title: 'Stunning Thumbnails in Seconds',
    description: 'Generate eye-catching thumbnails that boost clicks — no design skills needed.',
  },
];

export default function ParallaxCard() {
    return (
        <div>
            {tabs.map((tab, index) => {
                return <FeatureCard key={index} {...tab} />
            })}
        </div>
    )
}