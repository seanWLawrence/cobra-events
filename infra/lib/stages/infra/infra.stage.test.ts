import { Template } from "aws-cdk-lib/assertions";
import { Infra } from "./infra.stage";
import * as utils from "../../test-utils";

const stack = utils.stubStack((scope) => {
  new Infra(scope, "StubStack");
});
const template = Template.fromStack(stack);

test("matches snapshot", () => {
  expect(template.toJSON()).toMatchSnapshot();
});
