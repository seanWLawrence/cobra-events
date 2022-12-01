import { classed } from "@tw-classed/react";

export const Button = classed("button", " font-bold py-2 px-4 rounded-md", {
  variants: {
    color: {
      primary: "text-white bg-blue-500",
      secondary: "text-black bg-transparent outline",
    },
    defaultVariants: {
      color: "secondary",
    },
  },
});

export type ButtonProps = React.ComponentProps<typeof Button>;
