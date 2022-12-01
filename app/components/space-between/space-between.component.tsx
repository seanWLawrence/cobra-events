import * as React from "react";
import classNames from "classnames";
import { classed } from "@tw-classed/react";

export interface SpaceBetweenProps {
  direction: "vertical" | "horizontal";
  children: React.ReactNode;
  size: "none" | "s" | "m" | "l" | "xl";
}

const size: Record<SpaceBetweenProps["size"], number> = {
  none: 0,
  s: 2,
  m: 4,
  l: 6,
  xl: 8,
};

export const SpaceBetween: React.FC<SpaceBetweenProps> = (props) => {
  const isVertical = props.direction === "vertical";

  const className = classNames("flex", {
    // horizotal styles
    "flex-row": !isVertical,
    [`space-x-${size[props.size]}`]: !isVertical,

    // vertical styles
    "flex-col": isVertical,
    [`space-y-${size[props.size]}`]: isVertical,
  });

  return <div className={className}>{props.children}</div>;
};
