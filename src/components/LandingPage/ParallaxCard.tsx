import { useRef } from "react";
import FeatureCard from "./FeatureCard";
import { useScroll } from "framer-motion";

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
  {
    id: 4,
    color: 'bg-slate-500',
    title: 'Stunning Thumbnails in Seconds',
    description: 'Generate eye-catching thumbnails that boost clicks — no design skills needed.',
  }
];

export default function ParallaxCard() {
    // Calculate required height: 100vh per card + extra space for offsets
  const containerHeight = `${tabs.length * 100 + 50}vh`;
  const container = useRef(null);
  const { scrollYProgress} = useScroll({
    target: container,
    offset: ['start start','end end']
  })


    
    return (
        <div ref={container} className={`relative`} style={{ height: containerHeight }}>
        {tabs.map((tab, index) => {
            const targetScale = 1 - ((tabs.length - index) * 0.05);
            return <FeatureCard key={index} {...tab} range={[index * 0.25, 1]} targetScale={targetScale} progress={scrollYProgress} />;
        })}
        </div>
    )
}