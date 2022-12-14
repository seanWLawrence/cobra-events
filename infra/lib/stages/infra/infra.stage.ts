import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import invariant from "tiny-invariant";
import * as constants from "../../constants";
import * as stacks from "../../stacks/index.stack";

interface InfraProps extends cdk.StageProps {}

export class Infra extends cdk.Stage {
  public readonly amplifyAppIdOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props: InfraProps = {}) {
    super(scope, id, props);

    this.assertContextValuesExist();

    const { amplifyAppIdOutput } = new stacks.Hosting(this, "Hosting", {});
    this.amplifyAppIdOutput = amplifyAppIdOutput;

    new stacks.Api(this, "Api", {});
  }

  /**
   * Ensure all context values exist before attempting to initialize the contstructs that use them
   */
  private assertContextValuesExist() {
    for (const contextId in constants.context) {
      const contextValue = this.node.tryGetContext(contextId);

      invariant(
        contextValue,
        `Missing value for '${contextId}' while bootsrapping application.`
      );
    }
  }
}
