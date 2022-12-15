import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import invariant from "tiny-invariant";
import * as constants from "../../constants";
import type * as types from "../../types";
import * as stacks from "../../stacks/index.stack";

interface InfraProps extends cdk.StageProps {
  readonly branch: types.Branch;
}

export class Infra extends cdk.Stage {
  public readonly amplifyAppIdOutput: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props: InfraProps) {
    super(scope, id, props);

    this.assertContextValuesExist();

    const { amplifyAppIdOutput } = new stacks.Hosting(this, "Hosting", {});
    this.amplifyAppIdOutput = amplifyAppIdOutput;

    new stacks.Api(this, "Api", { branch: props.branch });
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
