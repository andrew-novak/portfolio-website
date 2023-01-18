import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useSpring, animated, to } from "react-spring";
import { useGestureResponder } from "react-gesture-responder";

export const MediaItemContext = createContext(null);

const MediaItem = ({ children }) => {
  const { style, onDragMove, onDragEnd } = useContext(MediaItemContext);
  const { left, top } = style;
  const startCoords = useRef({ left, top });
  const [shift, setShift] = useState({ left: 0, top: 0 });
  const isDragging = useRef(false);
  const [debug, setDebug] = useState(null);
  const defaultSpring = {
    translateX: 0,
    translateY: 0,
    immediate: true,
    xIndex: 0,
    scale: 1,
    opacity: 1,
  };
  const [spring, setSpring] = useSpring(() => defaultSpring);
  const setDefaultSpring = () => setSpring(defaultSpring);

  const handleDragMove = (responderState, responderEvent) => {
    const translateX = startCoords.current.left + responderState.delta[0];
    const translateY = startCoords.current.top + responderState.delta[1];
    setSpring({
      translateX,
      translateY,
      zIndex: 1,
      immediate: true,
      opacity: 0.8,
      scale: 1.1,
    });
    onDragMove(responderState);
  };

  const handleDragEnd = (responderState) => {
    isDragging.current = false;
    setDefaultSpring();
    onDragEnd(responderState);
  };

  const { bind } = useGestureResponder(
    {
      onMoveShouldSet: (responderState) => {
        //onDragStart();
        startCoords.current = { left: 0, top: 0 };
        isDragging.current = true;
        return true;
      },
      onMove: handleDragMove,
      onTerminationRequest: () => {
        if (isDragging.current) return false;
        return true;
      },
      onTerminate: handleDragEnd,
      onRelease: handleDragEnd,
    },
    {
      enableMouse: true,
    }
  );

  // reset on resize
  useEffect(() => {
    if (!isDragging.current) {
      setSpring({
        translateX: 0,
        translateY: 0,
        zIndex: 0,
        opacity: 1,
        scale: 1,
        immediate: false,
      });
    }
  }, [isDragging.current, left, top]);

  return (
    <animated.div
      {...bind}
      style={{
        ...style,
        cursor: "grabbing",
        zIndex: spring.zIndex,
        opacity: spring.opacity,
        transform: to(
          [spring.translateX, spring.translateY, spring.scale],
          (x, y, scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        ),
      }}
    >
      {children}
    </animated.div>
  );
};

export default MediaItem;
