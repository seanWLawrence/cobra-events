import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as infra from "../../lib/stacks/infra.stack";
import * as constants from "../../lib/constants";
import * as utils from "../utils";

test("creates CodeCommit repository", () => {
  const app = new cdk.App({ context: utils.getContext() });
  const stack = new infra.InfraStack(app, "TestStack");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::CodeCommit::Repository", {
    RepositoryName: app.node.tryGetContext(constants.context.appName),
  });
});
