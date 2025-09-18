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

  // 1) Base (static) placement: never animates
  const baseLeftPct = index * unitPct;     // stays constant; no transition on 'left'
  const widthPct = unitPct - 1.2;                // 1 unit (active visual double comes from scaleX)

  // 2) Transform-only motion
  // Move segments to the RIGHT of the active by exactly one base slot.
  const offset =
    index > activeIndex ? "translateX(100%)" : "translateX(0)";

  const scale  = isActive ? "scaleX(2)" : "scaleX(1)";
  const transform = `${offset} ${scale}`;
  const transformOrigin = "left center";   // active grows to the right

  return (
    <div
      className="absolute top-0 h-full rounded-full bg-gray-200 transition-transform duration-300"
      style={{
        left: `${baseLeftPct}%`,   // static; not transitioned
        width: `${widthPct}%`,
        transform,
        transformOrigin,
        willChange: "transform",
      }}
    >
      {/* Blue overlay fades in via opacity (compositor-friendly) */}
      <div
        className="w-full h-full rounded-full bg-blue-500 transition-opacity duration-300"
        style={{ 
          opacity: isActive ? 1 : 0,
          willChange: 'opacity',
          transform: 'translateZ(0)'
        }}
        
      />
    </div>
  );
}
