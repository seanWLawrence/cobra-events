import * as cdk from "aws-cdk-lib";
import * as assertions from "aws-cdk-lib/assertions";
import * as constants from "../../lib/constants";
import * as constructs from "../../lib/constructs/index.construct";
import * as utils from "../utils";

test("creates AppSync GraphQL Api", () => {
  const stack = utils.stubStack((scope) => {
    new constructs.Api(scope, "Api", {});
  });
  const template = assertions.Template.fromStack(stack);

  template.hasResourceProperties("AWS::AppSync::GraphQLApi", {
    Name: stack.node.tryGetContext(constants.context.appName),
    AuthenticationType: "AWS_IAM",
    XrayEnabled: false,
    LogConfig: assertions.Match.objectLike({
      ExcludeVerboseContent: true,
      FieldLogLevel: "ERROR",
    }),
  });

  template.hasResourceProperties("AWS::CertificateManager::Certificate", {
    DomainName: stack.node.tryGetContext(constants.context.domain),
    ValidationMethod: "DNS",
  });

  template.hasResourceProperties("AWS::AppSync::DomainName", {
    DomainName: `api.${stack.node.tryGetContext(constants.context.domain)}`,
    CertificateArn: assertions.Match.anyValue(),
    Description: assertions.Match.anyValue(),
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
  const stack = utils.stubStack((scope) => {
    new constructs.Api(scope, "Api", {});
  });

  const template = assertions.Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
