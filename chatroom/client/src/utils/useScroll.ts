import { RefObject, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const useScroll = (dependencies: any[]): RefObject<HTMLDivElement> => {
  const [scrollFlag, setScrollFlag] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollFlag(!scrollFlag);
  }, dependencies);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current?.scrollHeight });
  }, [scrollFlag]);

  return ref;
};
