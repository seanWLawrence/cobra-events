import { Construct } from 'constructs';
import { StackProps, Stack } from 'aws-cdk-lib';
import * as budgets from 'aws-cdk-lib/aws-budgets';
import invariant from 'tiny-invariant';

interface BudgetsProps extends StackProps {
	readonly maxMonthlyCostInUsd: number;
}

/**
 * Creates budgets to track application cost
 */
export class Budgets extends Stack {
	constructor(scope: Construct, id: string, props: BudgetsProps) {
		super(scope, id, props);

		const budgetAlertEmails: string[] | undefined = this.node.tryGetContext('budgetAlertEmails');

		invariant(budgetAlertEmails);

		const subscribers: budgets.CfnBudget.NotificationWithSubscribersProperty['subscribers'] =
			budgetAlertEmails.map((email: string) => {
				return { subscriptionType: 'EMAIL', address: email };
			});

		new budgets.CfnBudget(this, 'MaxMonthlyCostBudget', {
			budget: {
				budgetName: 'Max monthly spend',
				budgetLimit: { amount: props.maxMonthlyCostInUsd, unit: 'USD' },
				budgetType: 'COST',
				timeUnit: 'MONTHLY',
				costTypes: {
					includeCredit: true,
					includeDiscount: true,
					includeOtherSubscription: true,
					includeRecurring: true,
					includeRefund: true,
					includeSubscription: true,
					includeSupport: true,
					includeTax: true,
					includeUpfront: true
				}
			},
			notificationsWithSubscribers: [
				{
					notification: {
						comparisonOperator: 'EQUAL_TO',
						threshold: 100,
						notificationType: 'FORECASTED',
						thresholdType: 'PERCENTAGE'
					},
					subscribers
				}
			]
		});
	}
}
