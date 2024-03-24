import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";

interface ProgressTimerProps {
  type: string;
}

export default function ProgressTimer({ type }: ProgressTimerProps) {
  const [progress, setProgress] = useState<number>(12.5);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1.25, 100));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {type === "failed" && (
        <LinearProgress variant="determinate" color="error" value={progress} />
      )}
      {type === "success" && (
        <LinearProgress
          variant="determinate"
          color="success"
          value={progress}
        />
      )}
    </>
  );
}
