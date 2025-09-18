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

  // Left position (percent of container)
  // Added the 1 to adjust for the widthPct gap
  const leftPct =
    index <= activeIndex ? (index * unitPct) + 1 : (index + 1) * unitPct;

  // 

  // Base width is one "unit"; active doubles visually with scaleX(2)
  // Added the -1 for the gap
  const widthPct = unitPct - 1;

  // Transforms-only for the doubling
  const transform = isActive ? "scaleX(2)" : "scaleX(1)";
  const transformOrigin = "left center";

  return (
    <div
      className="absolute top-0 h-full rounded-full bg-gray-200 transition-[left,transform] duration-300"
      style={{
        left: `${leftPct}%`,
        width: `${widthPct}%`,
        transform,
        transformOrigin,
      }}
    >
      <div
        className="w-full h-full rounded-full bg-blue-500 transition-opacity duration-300"
        style={{ opacity: index === activeIndex ? 1 : 0 }}
      />
    </div>
  );
}
