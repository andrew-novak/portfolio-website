import React, { Children, useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

import { MediaItemContext } from "./MediaItem";

const MediaContainer = ({
  children,
  spacing: passedSpacing = 0,
  columns = 2,
  swapItemPlaces,
}) => {
  const spacing = parseInt(passedSpacing);
  const childrenCount = Children.count(children);
  const rows = Math.ceil(childrenCount / columns);
  const containerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState({
    left: 0,
    top: 0,
  });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [childSize, setChildSize] = useState(0);
  const [traverse, setTraverse] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const dropRefs = useRef(new Map());
  const mediaIndexes = Children.map(children, (_, i) => i);

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }

  useEffect(() => {
    const left =
      containerRef.current.offsetLeft +
      containerRef.current.offsetParent.offsetLeft;
    const top =
      containerRef.current.offsetTop +
      containerRef.current.offsetParent.offsetTop;
    setContainerPosition({ left, top });
  }, [
    containerRef.current && containerRef.current.offsetLeft,
    containerRef.current && containerRef.current.offsetTop,
    containerRef.current && containerRef.current.offsetParent.offsetLeft,
    containerRef.current && containerRef.current.offsetParent.offsetTop,
  ]);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const childSize = (containerWidth - (columns - 1) * spacing) / columns;
      const containerContentHeight = rows * childSize;
      const containerHeight = containerContentHeight + (rows - 1) * spacing;
      setContainerSize({ width: containerWidth, height: containerHeight });
      setChildSize(childSize);
    };
    containerRef.current && window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef, columns, rows, spacing]);

  const getChildPositionFromIndex = (index) => {
    const column = index % columns;
    const row = Math.trunc(index / columns);
    const left = column * childSize + column * spacing;
    const top = row * childSize + row * spacing;
    return { left, top };
  };

  /*
  this dropChildSize is the longest possible area
  on which you are able to drop a draggable media element.
  It includes both halves of each neighbour sizing.
  The first and last drop child size are always shorter
  because there's only one neighbouring sizing half.
  To make it easier we are just shifting "position (x or y)" by "half of spacing size".
  */
  const getChildIndexFromPosition = (x, y) => {
    const shiftedX = x + spacing / 2;
    const shiftedY = y + spacing / 2;
    const dropChildSize = childSize + spacing;
    const column = Math.trunc(shiftedX / dropChildSize);
    const row = Math.trunc(shiftedY / dropChildSize);
    const childIndex = row * columns + column;
    const isActualIndex = mediaIndexes.includes(childIndex);
    return isActualIndex ? childIndex : null;
  };

  const getTargetIndexFromResponderState = (state) => {
    const targetLeft = state.xy[0] - containerPosition.left;
    const targetTop = state.xy[1] - containerPosition.top;
    const targetIndex = getChildIndexFromPosition(targetLeft, targetTop);
    return targetIndex;
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: containerSize.height,
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {Children.map(children, (child, childIndex) => {
        const { top, left } = getChildPositionFromIndex(childIndex);

        const style = {
          position: "absolute",
          width: childSize,
          height: childSize,
          top,
          left,
          overflow: "hidden",
        };

        const onDragMove = (responderState) => {
          const targetIndex = getTargetIndexFromResponderState(responderState);
          // above different child's box
          if (targetIndex !== null && targetIndex !== childIndex) {
            setPlaceholder({
              targetIndex,
              startIndex: childIndex,
            });
          }
        };

        const isInsideContainer = (responderState) => {
          const x = responderState.xy[0];
          const y = responderState.xy[1];
          if (x < containerPosition.left) return false;
          if (x > containerPosition.left + containerSize.width) return false;
          if (y < containerPosition.top) return false;
          if (y > containerPosition.top + containerSize.height) return false;
          return true;
        };

        const onDragEnd = (responderState) => {
          if (!isInsideContainer(responderState)) {
            setPlaceholder(null);
            setDraggingIndex(null);
            return;
          }
          const targetIndex = getTargetIndexFromResponderState(responderState);
          if (targetIndex !== null) {
            swapItemPlaces(childIndex, targetIndex);
          }
          setPlaceholder(null);
          setDraggingIndex(null);
        };

        return (
          <MediaItemContext.Provider
            value={{
              style,
              onDragMove,
              onDragEnd,
            }}
          >
            {child}
          </MediaItemContext.Provider>
        );
      })}
    </div>
  );
};

export default MediaContainer;
