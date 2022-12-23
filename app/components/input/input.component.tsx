import { classed } from "@tw-classed/react";
import classNames from "classnames";

import { Label } from "../internal/label/label.component";
import * as theme from "~/theme";

const BaseInput = classed(
  "input",
  classNames(
    theme.font.formElement,
    theme.border,
    theme.activeState,
    theme.padding.formElement,
    theme.rounded,
    theme.text.formElement,
    "max-w-lg"
  ),
  { variants: {} }
);

export type InputProps = React.ComponentProps<typeof BaseInput> & {
  label: string;
};

export const Input: React.FC<InputProps> = (props) => {
  return (
    <Label>
      {props.label}
      <BaseInput {...props} />
    </Label>
  );
};
