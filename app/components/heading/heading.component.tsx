import { classed } from "@tw-classed/react";
import classNames from "classnames";

import * as theme from "~/theme";

export const Heading = classed("h2", classNames(theme.font.heading), {
  variants: {
    size: {
      s: "text-4xl",
      m: "text-5xl",
      l: "text-6xl",
      xl: "text-7xl",
      xxl: "text-8xl",
      xxxl: "text-9xl",
    },
  },
  defaultVariants: {
    size: "xxl",
  },
});

export type HeadingProps = React.ComponentProps<typeof Heading>;
