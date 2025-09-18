# Segmented Progress Bar

Animated segmented progress bar component for React.

## Usage

```tsx
import { SegmentedProgressBar } from './segmented-bar';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <SegmentedProgressBar 
      totalSteps={4} 
      activeIndex={activeIndex} 
    />
  );
}
```

## Props

- `totalSteps` - Number of segments
- `activeIndex` - Currently active segment (0-based)

## Development

```bash
npm install
npm run dev
```
