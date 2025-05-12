export default function FeatureCard({id, color, description, title}: {
    id: number;
    color: string;
    description: string;
    title: string;
}) {
    return (
        <div className={`p-6 rounded-lg ${color} text-black`}>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p>{description}</p>
        </div>
    )
}