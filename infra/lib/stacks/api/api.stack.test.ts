import * as assertions from "aws-cdk-lib/assertions";
import * as constants from "../../constants";
import { Api } from "./api.stack";
import * as utils from "../../test-utils";

const { template, stack } = utils.synthStack(
  (scope) => new Api(scope, "Api", { branch: constants.branch.main })
);

test("creates AppSync GraphQL Api", () => {
  template.hasResourceProperties("AWS::AppSync::GraphQLApi", {
    Name: stack.node.tryGetContext(constants.context.appName),
    AuthenticationType: "AWS_IAM",
    XrayEnabled: false,
    LogConfig: {
      ExcludeVerboseContent: true,
      FieldLogLevel: "ERROR",
    },
  });

  template.hasResourceProperties("Custom::LogRetention", {
    RetentionInDays: 30,
  });

  template.hasResourceProperties("AWS::AppSync::GraphQLSchema", {
    Definition: assertions.Match.stringLikeRegexp("schema"),
  });

  template.hasResourceProperties("AWS::AppSync::DataSource", {
    Name: "Stub",
    Type: "NONE",
  });
});

test("matches snapshot", () => {
  expect(template.toJSON()).toMatchSnapshot();
});
