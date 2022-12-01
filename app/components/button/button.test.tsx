import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Button } from "./button.component";

test("matches snapshot", () => {
  const name = "some name";

  render(<Button>{name}</Button>);
  const button = screen.getByRole("button", { name });

  expect(button).toMatchSnapshot();
});
