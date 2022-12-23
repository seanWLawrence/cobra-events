import { classed } from "@tw-classed/react";
import classNames from "classnames";

import * as theme from "~/theme";
import { Label } from "../internal/label/label.component";

const BaseTextarea = classed(
  "textarea",
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

export type TextareaProps = React.ComponentProps<typeof BaseTextarea> & {
  label: string;
};

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <Label>
      {props.label}
      <BaseTextarea {...props} rows={10} />
    </Label>
  );
};
