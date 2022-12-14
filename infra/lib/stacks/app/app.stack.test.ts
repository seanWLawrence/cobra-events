import { App } from "./app.stack";
import * as utils from "../../test-utils";

const { template } = utils.synthStack((scope) => new App(scope, "App", {}));

test("creates app", () => {});

test("matches snapshot", () => {
  expect(template.toJSON()).toMatchSnapshot();
});
