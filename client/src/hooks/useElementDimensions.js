import { useState, useEffect } from "react";

function getElementDimensions(ref) {
  const width = (ref.current && ref.current.clientWidth) || 0;
  const height = (ref.current && ref.current.clientHeight) || 0;
  return {
    width,
    height,
  };
}

const useElementDimensions = (ref) => {
  const [elementDimensions, setElementDimensions] = useState(
    getElementDimensions(ref)
  );

  useEffect(() => {
    function handleResize() {
      setElementDimensions(getElementDimensions(ref));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return elementDimensions;
};

export default useElementDimensions;
