import * as cdk from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";
import { InfraStack } from "./infra.stack";
import * as constants from "../constants";

interface InfraStageProps extends cdk.StageProps {}

class InfraStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: InfraStageProps = {}) {
    super(scope, id, props);

    new InfraStack(this, "InfraStack", {});
  }
}

interface InfraPipelineStackProps extends cdk.StackProps {}

export class InfraPipelineStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: InfraPipelineStackProps = {}
  ) {
    super(scope, id, props);

    const repoString = `${this.node.tryGetContext(
      constants.context.githubOwner
    )}/${this.node.tryGetContext(constants.context.appName)}`;

    const devPipeline = new pipelines.CodePipeline(this, "PipelineDev", {
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.gitHub(repoString, "dev"),
        installCommands: ["cd infra", "npm ci"],
        commands: ["npm run build", "npx cdk synth"],
        primaryOutputDirectory: "infra/cdk.out",
      }),
    });

    const prodPipeline = new pipelines.CodePipeline(this, "PipelineProd", {
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.gitHub(repoString, "main"),
        installCommands: ["cd infra", "npm ci"],
        commands: ["npm run build", "npx cdk synth"],
        primaryOutputDirectory: "infra/cdk.out",
      }),
    });

    devPipeline.addStage(new InfraStage(this, "AppStageDev", {}));
    prodPipeline.addStage(new InfraStage(this, "AppStageProd", {}));
  }
}
