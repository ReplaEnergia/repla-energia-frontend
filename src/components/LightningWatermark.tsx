interface LightningWatermarkProps {
  className?: string;
  position?: "left" | "right" | "center";
}

const LightningWatermark = ({ className = "", position = "right" }: LightningWatermarkProps) => {
  const positionClasses = {
    left: "-left-20 top-1/2 -translate-y-1/2",
    right: "-right-20 top-1/2 -translate-y-1/2",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg 
        className={`absolute ${positionClasses[position]} w-[400px] h-[400px] md:w-[600px] md:h-[600px] text-primary/[0.03] ${className}`}
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    </div>
  );
};

export default LightningWatermark;