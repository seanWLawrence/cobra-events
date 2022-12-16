import * as cdk from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";
import * as iam from "aws-cdk-lib/aws-iam";
import * as sns from "aws-cdk-lib/aws-sns";
import * as snsSubscriptions from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import * as stages from "../../stages/index.stage";
import * as constants from "../../constants";
import type * as types from "../../types";

export interface PipelineProps {
  readonly branch: types.Branch;
}

export class Pipeline extends Construct {
  constructor(scope: Construct, id: string, props: PipelineProps) {
    super(scope, id);

    const repoString = `${this.node.tryGetContext(
      constants.context.githubOwner
    )}/${this.node.tryGetContext(constants.context.appName)}`;

    const input = pipelines.CodePipelineSource.connection(
      repoString,
      props.branch,
      {
        connectionArn: this.node.tryGetContext(
          constants.context.codestarConnectionArn
        ),
      }
    );

    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      synth: new pipelines.ShellStep("Synth", {
        input,
        installCommands: ["cd infra", "npm ci"],
        commands: ["npm run test:ci", "npx cdk synth"],
        primaryOutputDirectory: "infra/cdk.out",
      }),
    });

    const infraStage = new stages.Infra(this, "Infra", {
      branch: props.branch,
    });
    const iamChangesTopic = new sns.Topic(this, "IamChanges");

    const emails: string[] = this.node.tryGetContext(
      constants.context.iamChangesNotificationEmails
    );

    emails.forEach((email) => {
      iamChangesTopic.addSubscription(
        new snsSubscriptions.EmailSubscription(email)
      );
    });

    pipeline.addStage(infraStage, {
      pre: [
        new pipelines.ConfirmPermissionsBroadening("IamChanges", {
          stage: infraStage,
          notificationTopic: iamChangesTopic,
        }),
      ],
      post: [
        new pipelines.CodeBuildStep("DeployToAmplify", {
          input,
          rolePolicyStatements: [
            new iam.PolicyStatement({
              actions: ["amplify:StartJob"],
              effect: iam.Effect.ALLOW,
              resources: [
                cdk.Arn.format(
                  {
                    service: "amplify",
                    resource: "apps/*/branches/dev/jobs/*",
                  },
                  cdk.Stack.of(this)
                ),
              ],
            }),
          ],
          envFromCfnOutputs: {
            AMPLIFY_APP_ID: infraStage.amplifyAppIdOutput,
          },
          commands: [
            `aws amplify start-job --app-id "$AMPLIFY_APP_ID" --job-type RELEASE --branch-name ${props.branch}`,
          ],
        }),
      ],
    });
  }
}
