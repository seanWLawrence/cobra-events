import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { SpaceBetween, SpaceBetweenProps } from "./space-between.component";

const testId = "testId";

test("direction=horizontal adds flex-row", () => {
  render(
    <SpaceBetween direction="horizontal" size="s">
      <div data-testid={testId}></div>
    </SpaceBetween>
  );

  // Testing parent element wrapper
  const wrapper = screen.getByTestId(testId).parentElement;

  expect(wrapper).toHaveClass("flex");
  expect(wrapper).toHaveClass("flex-row");
});

test("direction=vertical adds flex-col", () => {
  render(
    <SpaceBetween direction="vertical" size="s">
      <div data-testid={testId}></div>
    </SpaceBetween>
  );

  // Testing parent element wrapper
  const wrapper = screen.getByTestId(testId).parentElement;

  expect(wrapper).toHaveClass("flex");
  expect(wrapper).toHaveClass("flex-col");
});

const sizes: SpaceBetweenProps["size"][] = ["s", "m", "l", "xl"];

sizes.forEach((size) => {
  test(`direction=vertical size=${size} passes  space-y classes`, () => {
    render(
      <SpaceBetween direction="vertical" size={size}>
        <div data-testid={testId}></div>
      </SpaceBetween>
    );

    // Testing parent element since it wraps each child with margin
    const wrapper = screen.getByTestId(testId).parentElement;

    expect(wrapper?.className).toMatch(/space-y-/g);
  });

  test(`direction=horizontal size=${size} passes  space-x classes`, () => {
    render(
      <SpaceBetween direction="horizontal" size={size}>
        <div data-testid={testId}></div>
      </SpaceBetween>
    );

    // Testing parent element since it wraps each child with margin
    const wrapper = screen.getByTestId(testId).parentElement;

    expect(wrapper?.className).toMatch(/space-x-/g);
  });
});
