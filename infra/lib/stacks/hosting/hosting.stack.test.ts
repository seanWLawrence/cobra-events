import * as assertions from "aws-cdk-lib/assertions";
import * as constants from "../../constants";
import { Hosting } from "./hosting.stack";
import * as utils from "../../test-utils";

const { template, stack } = utils.synthStack(
  (scope) => new Hosting(scope, "Hosting", {})
);

test("creates Amplify app", () => {
  template.hasResourceProperties("AWS::Amplify::App", {
    Name: stack.node.tryGetContext(constants.context.appName),
    Repository: assertions.Match.anyValue(),
    BuildSpec: assertions.Match.anyValue(),
  });

  template.hasResourceProperties("AWS::Amplify::Branch", {
    BranchName: "main",
    EnableAutoBuild: false,
  });

  template.hasResourceProperties("AWS::Amplify::Branch", {
    BranchName: "dev",
    EnableAutoBuild: false,
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
  expect(template.toJSON()).toMatchSnapshot();
});
