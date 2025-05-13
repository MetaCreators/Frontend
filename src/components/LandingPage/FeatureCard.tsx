import {motion,useScroll,useTransform} from "framer-motion"
import { useRef } from "react";
export default function FeatureCard({ id, color, description, title }: {
    id: number;
    color: string;
    description: string;
    title: string;
}) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end",'start start']
    })
    const scale = useTransform(scrollYProgress,[0,1],[2,1])
    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky -top-3">
            <div className={`p-6 rounded-lg ${color} text-black w-[1000px] h-[80vh]`}>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p>{description}</p>
                <div className="relative overflow-hidden w-[60%] h-[60%] flex justify-center items-center">
                    <motion.div 
                        style={{
                            opacity: scrollYProgress,
                            scale,
                            transformOrigin: 'center'
                        }} 
                        className="w-full h-full"
                    >
                        <img src="/logo.png" alt="logo" className="rounded-md object-cover w-full h-full" />
                    </motion.div> 
                </div>
            </div>
        </div>
    )
}