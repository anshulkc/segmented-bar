type Props = { totalSteps: number; activeIndex: number };

export function SegmentedProgressBar({ totalSteps, activeIndex }: Props) {
  const unitPct = 100 / (totalSteps + 1); // one "unit" in %
  
  return (
    <div className="relative w-full h-2 bg-white">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <Segment
          key={i}
          index={i}
          totalSteps={totalSteps}
          activeIndex={activeIndex}
          unitPct={unitPct}
        />
      ))}
    </div>
  );
}

function Segment({
  index,
  activeIndex,
  unitPct,
}: {
  index: number;
  activeIndex: number;
  totalSteps: number;
  unitPct: number;
}) {
  const isActive = index === activeIndex;

  const baseLeftPct = index * unitPct;
  const widthPct = unitPct - 1.2;

  const offset = index > activeIndex ? "translateX(100%)" : "translateX(0)";
  const scale = isActive ? "scaleX(2)" : "scaleX(1)";
  const transform = `${offset} ${scale}`;

  const counterScale = isActive ? "scaleX(0.5)" : "scaleX(1)";
  const CAP_WIDTH_PX = 12; // Should be half the segment's height for a perfect circle

  return (
    <div
      className="absolute top-0 h-full bg-gray-200 rounded-full transition-transform duration-300"
      style={{
        left: `${baseLeftPct}%`,
        width: `${widthPct}%`,
        transform,
        transformOrigin: "left center",
        willChange: "transform",
      }}
    >
      <div
        className="w-full h-full relative transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          willChange: 'opacity',
        }}
      >
        {/* 1. Base Layer: A solid blue bar that stretches and guarantees no gaps. */}
        <div className="w-full h-full bg-blue-500 rounded-full" />

        {/* 2. Left Cap Overlay */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-l-full transition-transform duration-300"
          style={{
            width: `${CAP_WIDTH_PX}px`,
            transform: counterScale,
            transformOrigin: "left center",
            willChange: 'transform',
          }}
        />

        {/* 3. Right Cap Overlay */}
        <div
          className="absolute top-0 right-0 h-full bg-blue-500 rounded-r-full transition-transform duration-300"
          style={{
            width: `${CAP_WIDTH_PX}px`,
            transform: counterScale,
            transformOrigin: "right center",
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
}