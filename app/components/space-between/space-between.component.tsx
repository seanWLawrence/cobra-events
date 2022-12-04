import * as React from "react";
import classNames from "classnames";

export interface SpaceBetweenProps {
  direction: "vertical" | "horizontal";
  children: React.ReactNode;
  size: "none" | "s" | "m" | "l" | "xl";
}

/**
 * Sets a flexbox row or column around its children and adds a
 * gap between
 *
 * Note: Tailwind CSS will not work with meta programming. That's why
 * the classnames are written out all the way like this instead of
 * dynamically creating them
 */
export const SpaceBetween: React.FC<SpaceBetweenProps> = (props) => {
  const isVertical = props.direction === "vertical";

  const className = classNames("flex", {
    // horizotal styles
    "flex-row": !isVertical,
    "gap-x-0": !isVertical && props.size === "none",
    "gap-x-2": !isVertical && props.size === "s",
    "gap-x-4": !isVertical && props.size === "m",
    "gap-x-6": !isVertical && props.size === "l",
    "gap-x-8": !isVertical && props.size === "xl",

    // vertical styles
    "flex-col": isVertical,
    "gap-y-0": isVertical && props.size === "none",
    "gap-y-2": isVertical && props.size === "s",
    "gap-y-4": isVertical && props.size === "m",
    "gap-y-6": isVertical && props.size === "l",
    "gap-y-8": isVertical && props.size === "xl",
  });

  return <div className={className}>{props.children}</div>;
};
