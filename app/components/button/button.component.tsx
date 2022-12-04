import classNames from "classnames";
import { classed } from "@tw-classed/react";

import * as theme from "../../styles/theme";

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
        primary: "bg-indigo-600 text-white",
        secondary: "bg-transparent text-indigo-600",
      },
      defaultVariants: {
        color: "primary",
      },
    },
  }
);

export type ButtonProps = React.ComponentProps<typeof Button>;
