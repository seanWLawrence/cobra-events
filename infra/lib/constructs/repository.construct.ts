import { Construct } from "constructs";
import * as codeCommit from "aws-cdk-lib/aws-codecommit";

import * as constants from "../constants";

export interface RepositoryProps {}

/**
 * Creates a CodeCommit repository to store the application and infrastructure code
 */
export class Repository extends Construct {
  public readonly repository: codeCommit.Repository;

  constructor(scope: Construct, id: string, props: RepositoryProps = {}) {
    super(scope, id);

    const repositoryName = this.node.tryGetContext(constants.context.appName);

    this.repository = new codeCommit.Repository(this, repositoryName, {
      repositoryName,
    });
  }
}
