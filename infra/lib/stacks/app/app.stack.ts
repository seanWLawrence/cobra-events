import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as constants from "../../constants";
import * as constructs from "../../constructs/index.construct";

interface AppProps extends cdk.StackProps {}

export class App extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppProps = {}) {
    super(scope, id, props);

    new constructs.Pipeline(this, "Dev", {
      branch: constants.branch.dev,
    });

    new constructs.Pipeline(this, "Prod", {
      branch: constants.branch.main,
    });
  }
}
