import { useEffect, useState } from "react";

interface UseDirection {
  height: number;
}

function useDirection({ height }: UseDirection) {
  const [heightTracker, setHeightTracker] = useState<number | undefined>(
    undefined
  );
  const [ascending, setAscending] = useState(true);
  const [turningPoint, setTurningPoint] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (heightTracker !== undefined) {
      if (height - heightTracker > 0) {
        if (!ascending) {
          setTurningPoint(height);
        }
        setAscending(true);
      } else {
        if (ascending) {
          setTurningPoint(height);
        }
        setAscending(false);
      }
    }

    setHeightTracker(height);
  }, [height]); //eslint-disable-line

  return { turningPoint };
}

export default useDirection;
