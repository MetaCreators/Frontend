import {motion,MotionValue,useScroll,useTransform} from "framer-motion"
import { useRef } from "react";
export default function FeatureCard({ id, color, description, title,progress,range,targetScale }: {
    id: number;
    color: string;
    description: string;
    title: string;
    range: number[];
    progress: MotionValue<number>;
    targetScale: any
}) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end",'start start']
    })
    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const cardScale = useTransform(progress,range,[1,targetScale]);
    return (
        <div 
            ref={container} 
            className="h-screen flex items-center justify-center sticky"
            style={{ top: `calc(10% + ${(id) * 2}%)` }}
        >
            <motion.div style={{ scale: cardScale }} className={`p-6 rounded-lg ${color} text-black w-[1000px] h-[80vh]`}>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p>{description}</p>
                <div className="relative overflow-hidden w-[60%] h-[60%] flex justify-center items-center">
                    <motion.div 
                        style={{
                            opacity: scrollYProgress,
                            scale:imageScale,
                            transformOrigin: 'center'
                        }} 
                        className="w-full h-full"
                    >
                        <img src="/logo.png" alt="logo" className="rounded-md object-cover w-full h-full" />
                    </motion.div> 
                </div>
            </motion.div>
        </div>
    )
}