import * as cdk from "aws-cdk-lib";
import * as budgets from "aws-cdk-lib/aws-budgets";
import { Construct } from "constructs";

import * as constants from "../../constants";

export interface BudgetsProps extends cdk.StackProps {}

export class Budgets extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BudgetsProps = {}) {
    super(scope, id, props);

    const notificationEmails: string[] = this.node.tryGetContext(
      constants.context.budgetsNotificationEmails
    );

    const notificationSubscribers = notificationEmails.map((email) => {
      return {
        address: email,
        subscriptionType: "EMAIL",
      };
    });

    const MAX_AMOUNT_MONTHLY = 10;

    new budgets.CfnBudget(this, "Budget", {
      budget: {
        budgetType: "COST",
        budgetLimit: { amount: MAX_AMOUNT_MONTHLY, unit: "USD" },
        timeUnit: "MONTHLY",
      },
      notificationsWithSubscribers: [
        {
          notification: {
            notificationType: "FORECASTED",
            threshold: 100,
            thresholdType: "PERCENTAGE",
            comparisonOperator: "GREATER_THAN",
          },
          subscribers: notificationSubscribers,
        },
      ],
    });
  }
}
