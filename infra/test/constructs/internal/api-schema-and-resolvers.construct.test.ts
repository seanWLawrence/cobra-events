import * as cdk from "aws-cdk-lib";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as assertions from "aws-cdk-lib/assertions";
import * as internalConstructs from "../../../lib/constructs/internal/index.construct";
import * as utils from "../../utils";

test("creates Api schema and resolvers", () => {
  const stack = utils.stubStack((scope) => {
    const graphqlApi = new appsync.GraphqlApi(scope, "GraphqlApi", {
      name: "STUB",
    });

    new internalConstructs.ApiSchemaAndResolvers(
      scope,
      "ApiSchemaAndResolvers",
      { graphqlApi }
    );
  });
  const template = assertions.Template.fromStack(stack);

  template.hasResourceProperties("AWS::AppSync::DataSource", {
    Name: "Stub",
    Type: "NONE",
  });

  template.hasResourceProperties("AWS::AppSync::Resolver", {
    RequestMappingTemplate: assertions.Match.stringLikeRegexp("version"),
    ResponseMappingTemplate: assertions.Match.stringLikeRegexp(".*"),
    TypeName: "Query",
  });

  template.hasResourceProperties("AWS::AppSync::GraphQLSchema", {
    Definition:
      assertions.Match.stringLikeRegexp("schema ") &&
      assertions.Match.stringLikeRegexp("interface Node"),
  });
});

test("matches snapshot", () => {
  const stack = utils.stubStack((scope) => {
    const graphqlApi = new appsync.GraphqlApi(scope, "GraphqlApi", {
      name: "STUB",
    });

    new internalConstructs.ApiSchemaAndResolvers(
      scope,
      "ApiSchemaAndResolvers",
      { graphqlApi }
    );
  });

  const template = assertions.Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
