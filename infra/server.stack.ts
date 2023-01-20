import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { resolve } from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';
import type { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';

interface ServerProps extends StackProps {
	readonly apiDomain: string;
	readonly certificate: ICertificate;
}

export class Server extends Stack {
	public readonly handler: lambda.Function;
	public readonly restApi: apiGateway.LambdaRestApi;

	constructor(scope: Construct, id: string, props: ServerProps) {
		super(scope, id, props);

		this.handler = new lambda.Function(this, 'Handler', {
			code: lambda.Code.fromAsset(resolve(process.cwd(), 'build')),
			runtime: lambda.Runtime.NODEJS_18_X,
			handler: 'index.handler',
			logRetention: logs.RetentionDays.ONE_WEEK,
			timeout: Duration.seconds(10)
		});

		this.restApi = new apiGateway.LambdaRestApi(this, 'RestApi', {
			handler: this.handler,
			domainName: {
				domainName: props.apiDomain,
				certificate: props.certificate,
				endpointType: apiGateway.EndpointType.REGIONAL
			}
		});
	}
}
