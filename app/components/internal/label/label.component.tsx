import { classed } from "@tw-classed/react";
import classNames from "classnames";

import * as theme from "~/theme";

export const Label = classed(
  "label",
  classNames(
    "flex flex-col gap-y-2",
    theme.font.heading,
    theme.text.formElement
  ),
  {}
);

export type LabelProps = React.ComponentProps<typeof Label>;
