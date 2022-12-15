import * as cdk from "aws-cdk-lib";
import * as assertions from "aws-cdk-lib/assertions";
import { Construct } from "constructs";

import context from "../cdk.context.example.json";

export const getContext = () => {
  return context;
};

export const synthStack = (
  initStack: (scope: cdk.App) => cdk.Stack
): { template: assertions.Template; stack: cdk.Stack } => {
  const app = new cdk.App({ context: getContext() });

  const stack = initStack(app);
  const template = assertions.Template.fromStack(stack);

  return { stack, template };
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
