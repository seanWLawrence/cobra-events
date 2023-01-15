import { Construct } from 'constructs';
import { StackProps, Stack, CfnOutput } from 'aws-cdk-lib';
import * as elasticBeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import invariant from 'tiny-invariant';

interface ElasticBeanstalkProps extends StackProps {}

/**
 * Creates Elastic Beanstalk application
 * TODO: create the environment as well, but it's extremely complex as L1 construct and for now is better with the console
 */
export class ElasticBeanstalkApplication extends Stack {
	public readonly application: elasticBeanstalk.CfnApplication;

	constructor(scope: Construct, id: string, props: ElasticBeanstalkProps) {
		super(scope, id, props);

		const appName = this.node.tryGetContext('appName');

		invariant(appName);

		this.application = new elasticBeanstalk.CfnApplication(this, 'Application', {
			applicationName: appName,
			description: 'An instance of the Cobra Events event management system.',
			resourceLifecycleConfig: {
				versionLifecycleConfig: {
					maxCountRule: { enabled: true, maxCount: 10, deleteSourceFromS3: false }
				}
			}
		});

		invariant(this.application.applicationName);

		new CfnOutput(this, 'ApplicationName', { value: this.application.applicationName });
		new CfnOutput(this, 'ApplicationArn', { value: this.application.ref });
	}
}
