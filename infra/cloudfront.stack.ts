import { Construct } from 'constructs';
import { StackProps, Stack, CfnOutput } from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import invariant from 'tiny-invariant';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';

interface CloudFrontProps extends StackProps {
	readonly apiDomain: string;
	readonly customDomains: string[];
	readonly certificate: ICertificate;
}

/**
 * Creates CloudFront distribution to sit in front of the Elastic Beanstalk server
 */
export class CloudFront extends Stack {
	constructor(scope: Construct, id: string, props: CloudFrontProps) {
		super(scope, id, props);

		const certificateArn = this.node.tryGetContext('certificateArn');
		const domainName = this.node.tryGetContext('domainName');

		invariant(certificateArn);
		invariant(domainName);

		const distribution = new cloudfront.Distribution(this, 'Distribution', {
			certificate: props.certificate,
			priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
			enabled: true,
			domainNames: props.customDomains,
			defaultBehavior: {
				compress: true,
				origin: new origins.HttpOrigin(props.apiDomain, {
					protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY
				}),
				viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS
			}
		});

		new CfnOutput(this, 'DistributionDomainName', { value: distribution.distributionDomainName });
	}
}
