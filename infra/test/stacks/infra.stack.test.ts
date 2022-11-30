import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as infra from "../../lib/stacks/infra.stack";
import * as utils from "../utils";

test("matches snapshot", () => {
  const app = new cdk.App({ context: utils.getContext() });
  const stack = new infra.InfraStack(app, "StubStack");
  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
