import { useEffect, useRef, useState } from "react";

function useWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const workerCode = `
      self.onmessage = function (e) {
        const { position, target } = e.data;
        const stiffness = 0.2;
        const damping = 0.05;
        let velocity = 0;
        let currentPosition = position;

        function animate() {
          const force = (target - currentPosition) * stiffness;
          velocity = velocity * damping + force;

          if (Math.abs(velocity) < 0.0001) {
            velocity = 0;
          }

          currentPosition += velocity;

          self.postMessage({ currentPosition });

          if (
            Math.abs(target - currentPosition) > 0.01 ||
            Math.abs(velocity) > 0.01
          ) {
            requestAnimationFrame(animate);
          } else {
            self.postMessage({ currentPosition: target });
          }
        }

        animate();
      };
    `;

    const blob = new Blob([workerCode], { type: "application/javascript" });
    const workerUrl = URL.createObjectURL(blob);
    workerRef.current = new Worker(workerUrl);

    workerRef.current.onmessage = (e) => {
      const { currentPosition } = e.data;
      setHeight(currentPosition);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        URL.revokeObjectURL(workerUrl);
      }
    };
  }, []);

  const startSpringAnimation = (targetHeight: number) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        position: height,
        target: targetHeight,
      });
    }
  };

  return { height, setHeight, startSpringAnimation };
}

export default useWorker;
