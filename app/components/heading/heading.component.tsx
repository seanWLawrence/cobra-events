import { classed } from "@tw-classed/react";

const variants = {
  size: {
    s: "text-l",
    m: "text-xl",
    l: "text-2xl",
    xl: "text-4xl",
    xxl: "text-6xl",
    xxxl: "text-8xl",
  },
};

export const H1 = classed("h1", {
  variants,
  defaultVariants: {
    size: "xxxl",
  },
});

export type H1Props = React.ComponentProps<typeof H1>;

export const H2 = classed("h2", {
  variants,
  defaultVariants: {
    size: "xxl",
  },
});

export type H2Props = React.ComponentProps<typeof H2>;

export const H3 = classed("h3", {
  variants,
  defaultVariants: {
    size: "xl",
  },
});

export type H3Props = React.ComponentProps<typeof H3>;

export const H4 = classed("h4", {
  variants,
  defaultVariants: {
    size: "l",
  },
});

export type H4Props = React.ComponentProps<typeof H4>;

export const H5 = classed("h5", {
  variants,
  defaultVariants: {
    size: "m",
  },
});

export type H5Props = React.ComponentProps<typeof H5>;

export const H6 = classed("h6", {
  variants,
  defaultVariants: {
    size: "s",
  },
});

export type H6Props = React.ComponentProps<typeof H6>;
