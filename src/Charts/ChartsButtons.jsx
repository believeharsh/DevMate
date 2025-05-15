import react from "react";
const ChartsButtons = ({chartType, setChartType}) => {
    return (
        <>
            <div className="flex gap-2 mb-2">
                {["bar", "line", "pie"].map(type => (
                    <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`px-3 py-1 rounded-md text-sm ${chartType === type ? "bg-sky-500 text-white" : "bg-neutral-700 text-gray-300"
                            }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
        </>
    )
}

export default ChartsButtons; 