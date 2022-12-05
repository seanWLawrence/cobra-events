import * as cdk from "aws-cdk-lib";
import * as assertions from "aws-cdk-lib/assertions";
import * as constants from "../../lib/constants";
import * as constructs from "../../lib/constructs/index.construct";
import * as utils from "../utils";

test("creates Amplify app", () => {
  const stack = utils.stubStack((scope) => {
    const { repository } = new constructs.Repository(scope, "Repository");

    new constructs.Hosting(scope, "Hosting", { repository });
  });
  const template = assertions.Template.fromStack(stack);

  template.hasResourceProperties("AWS::Amplify::App", {
    Name: stack.node.tryGetContext(constants.context.appName),
    Repository: assertions.Match.anyValue(),
    BuildSpec: assertions.Match.anyValue(),
  });

  template.hasResourceProperties("AWS::Amplify::Branch", {
    BranchName: "main",
    EnableAutoBuild: true,
    EnablePullRequestPreview: true,
  });

  template.hasResourceProperties("AWS::Amplify::Branch", {
    BranchName: "dev",
    EnableAutoBuild: true,
    EnablePullRequestPreview: true,
  });

  template.hasResourceProperties("AWS::Amplify::Domain", {
    DomainName: stack.node.tryGetContext(constants.context.domain),
    EnableAutoSubDomain: true,
    AutoSubDomainCreationPatterns: ["dev"],
    SubDomainSettings: assertions.Match.arrayWith([
      assertions.Match.objectLike({ Prefix: "" }),
      assertions.Match.objectLike({ Prefix: "www" }),
      assertions.Match.objectLike({ Prefix: "dev" }),
    ]),
  });
});

test("matches snapshot", () => {
  const stack = utils.stubStack((scope) => {
    const { repository } = new constructs.Repository(scope, "Repository");

    new constructs.Hosting(scope, "Hosting", { repository });
  });

  const template = assertions.Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
