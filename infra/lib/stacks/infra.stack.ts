import * as cdk from "aws-cdk-lib";
import invariant from "tiny-invariant";
import { Construct } from "constructs";

import * as constructs from "../constructs/index.construct";
import * as constants from "../constants";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.assertContextValuesExist();

    new constructs.Repository(this, "Repository");
  }

  /**
   * Ensure all context values exist before attempting to initialize the contstructs that use them
   */
  public assertContextValuesExist() {
    for (const contextId in constants.context) {
      const contextValue = this.node.tryGetContext(contextId);

      invariant(
        contextValue,
        `Missing value for '${contextId}' while bootsrapping application.`
      );
    }
  }
}
