import classNames from "classnames";
import { classed } from "@tw-classed/react";

import * as theme from "~/theme";

export const Button = classed(
  "button",
  classNames(
    theme.padding.formElement,
    theme.font.formElement,
    theme.text.formElement,
    theme.rounded,
    theme.activeState,
    theme.inactiveState.button,
    theme.border
  ),
  {
    variants: {
      color: {
        primary:
          "bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-700",
        secondary:
          "bg-transparent text-indigo-600 hover:bg-indigo-50 focus:bg-indigo-50",
      },
      defaultVariants: {
        color: "primary",
      },
    },
  }
);

export type ButtonProps = React.ComponentProps<typeof Button>;
