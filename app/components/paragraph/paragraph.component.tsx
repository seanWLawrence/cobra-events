import { classed } from "@tw-classed/react";
import classNames from "classnames";

import * as theme from "~/theme";

export const Paragraph = classed(
  "p",
  classNames(theme.font.body, theme.text.body, theme.maxWidth.body),
  {}
);

export type ParagraphProps = React.ComponentProps<typeof Paragraph>;
