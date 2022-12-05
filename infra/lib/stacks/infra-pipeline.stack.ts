import * as cdk from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";
import * as codecommit from "aws-cdk-lib/aws-codecommit";
import { Construct } from "constructs";
import { InfraStack } from "./infra.stack";
import * as constructs from "../constructs/index.construct";

interface InfraStageProps extends cdk.StageProps {}

class InfraStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: InfraStageProps = {}) {
    super(scope, id, props);

    new InfraStack(this, "Infra", {});
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

    const { repository } = new constructs.Repository(this, "Repository");

    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.codeCommit(repository, "main"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    pipeline.addStage(new InfraStage(this, "App", {}));
  }
}
