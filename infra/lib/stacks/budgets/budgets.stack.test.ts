import * as assertions from "aws-cdk-lib/assertions";
import * as constants from "../../constants";
import { Budgets } from "./budgets.stack";
import * as utils from "../../test-utils";

const { template } = utils.synthStack(
  (scope) => new Budgets(scope, "Budgets", {})
);

test("creates budget", () => {
  template.hasResourceProperties("AWS::Budgets::Budget", {
    Budget: assertions.Match.objectLike({
      BudgetLimit: {
        Amount: 10,
        Unit: "USD",
      },
      BudgetType: "COST",
      TimeUnit: "MONTHLY",
    }),
    NotificationsWithSubscribers: [
      {
        Notification: {
          ComparisonOperator: "GREATER_THAN",
          NotificationType: "FORECASTED",
          Threshold: 100,
          ThresholdType: "PERCENTAGE",
        },
        Subscribers: [
          {
            Address: "jane@example.com",
            SubscriptionType: "EMAIL",
          },
        ],
      },
    ],
  });
});

test("matches snapshot", () => {
  expect(template.toJSON()).toMatchSnapshot();
});
