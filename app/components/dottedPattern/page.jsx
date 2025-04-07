const DottedPattern = () => {
    return (
        <div className="absolute bottom-4 right-10 grid grid-cols-5 gap-5">
            {[...Array(15)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-[#D92D8A] rounded-full"></div>
            ))}
        </div>

    );
};

export default DottedPattern;
