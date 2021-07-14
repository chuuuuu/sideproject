import React, { useEffect } from "react";

// example3 is depends on [], which means that
// the mounting function and the unmounting function will be called only once
export const Example3: React.FC = () => {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      console.log(e);
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div>move your cursor</div>;
};
