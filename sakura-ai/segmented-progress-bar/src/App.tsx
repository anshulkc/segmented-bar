import { useState } from "react";
import { SegmentedProgressBar } from "./segmented-bar";

export function SegmentedProgressBarDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSteps = 4;

  const handleClick = (i: number) => {
    setActiveIndex(i);
  };

  return (
    <div className="fixed inset-0 flex w-full flex-col items-center justify-center gap-4">
      <div className="w-96">
        <SegmentedProgressBar
          totalSteps={totalSteps}
          activeIndex={activeIndex}
        />
      </div>

      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
