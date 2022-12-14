import * as assertions from "aws-cdk-lib/assertions";
import { Pipeline } from "./pipeline.construct";
import * as constants from "../../constants";
import * as utils from "../../test-utils";

const stack = utils.stubStack((scope) => {
  new Pipeline(scope, "Pipeline", { branch: constants.branch.dev });
});
const template = assertions.Template.fromStack(stack);

test("creates cdk pipeline", () => {
  template.hasResourceProperties("AWS::S3::Bucket", {
    BucketEncryption: assertions.Match.anyValue(),
    PublicAccessBlockConfiguration: assertions.Match.anyValue(),
  });
});

template.hasResourceProperties("AWS::CodePipeline::Pipeline", {
  Stages: assertions.Match.arrayWith([
    assertions.Match.objectLike({
      Actions: assertions.Match.arrayEquals([
        assertions.Match.objectLike({
          ActionTypeId: assertions.Match.objectLike({
            Provider: "CodeStarSourceConnection",
          }),
          RunOrder: 1,
        }),
      ]),
      Name: "Source",
    }),
    assertions.Match.objectLike({ Name: "Build" }),
    assertions.Match.objectLike({ Name: "UpdatePipeline" }),
    assertions.Match.objectLike({ Name: "Assets" }),
    assertions.Match.objectLike({
      Name: "Infra",
      Actions: assertions.Match.arrayWith([
        assertions.Match.objectLike({
          Name: "IamChanges.Check",
          RunOrder: 1,
        }),
        assertions.Match.objectLike({
          Name: "IamChanges.Confirm",
          RunOrder: 2,
        }),
        assertions.Match.objectLike({ Name: "Api.Prepare", RunOrder: 3 }),
        assertions.Match.objectLike({ Name: "Hosting.Prepare", RunOrder: 3 }),
        assertions.Match.objectLike({ Name: "Api.Deploy", RunOrder: 4 }),
        assertions.Match.objectLike({ Name: "Hosting.Deploy", RunOrder: 4 }),
        assertions.Match.objectLike({ Name: "DeployToAmplify", RunOrder: 5 }),
      ]),
    }),
  ]),
});

template.hasResourceProperties("AWS::SNS::Subscription", {
  Endpoint: assertions.Match.stringLikeRegexp("@"),
  Protocol: "email",
  TopicArn: assertions.Match.anyValue(),
});

test("matches snapshot", () => {
  expect(template.toJSON()).toMatchSnapshot();
});
