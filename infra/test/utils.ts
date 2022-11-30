import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import context from "../cdk.context.json";

export const getContext = () => {
  return context;
};

export const stubStack = (
  initConstructs: (scope: cdk.Stack) => void
): cdk.Stack => {
  const app = new cdk.App({ context: getContext() });

  class StubStack extends cdk.Stack {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      initConstructs(this);
    }
  }

  return new StubStack(app, "StubStack");
};
