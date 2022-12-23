import { classed } from "@tw-classed/react";
import classNames from "classnames";

import * as theme from "~/theme";

export const ListItem = classed(
  "li",
  classNames(theme.font.body, theme.text.body, "list-item"),
  { variants: {} }
);

export type ListItemProps = React.ComponentProps<typeof ListItem> & {};

const BaseList = classed(
  "ul",
  classNames("list-disc list-inside space-y-6", theme.maxWidth.body),
  {
    variants: {},
  }
);

export type ListProps = React.ComponentProps<typeof BaseList> & {};

export const List: React.FC<ListProps> = (props) => {
  return <BaseList>{props.children}</BaseList>;
};
