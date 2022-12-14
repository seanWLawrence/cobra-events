import * as appsync from "@aws-cdk/aws-appsync-alpha";
import * as assertions from "aws-cdk-lib/assertions";
import { ApiSchemaAndResolvers } from "./api-schema-and-resolvers.construct";
import * as utils from "../../test-utils";

const stack = utils.stubStack((scope) => {
  const graphqlApi = new appsync.GraphqlApi(scope, "GraphqlApi", {
    name: "STUB",
  });

  new ApiSchemaAndResolvers(scope, "ApiSchemaAndResolvers", { graphqlApi });
});
const template = assertions.Template.fromStack(stack);

test("creates Api schema and resolvers", () => {
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
  expect(template.toJSON()).toMatchSnapshot();
});
