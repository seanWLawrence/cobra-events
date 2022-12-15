import { Template } from "aws-cdk-lib/assertions";
import { Infra } from "./infra.stage";
import * as utils from "../../test-utils";
import * as constants from "../../constants";

const stack = utils.stubStack((scope) => {
  new Infra(scope, "Infra", { branch: constants.branch.main });
});
const template = Template.fromStack(stack);

test("matches snapshot", () => {
  expect(template.toJSON()).toMatchSnapshot();
});
