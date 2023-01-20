import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as certificateManager from 'aws-cdk-lib/aws-certificatemanager';
import invariant from 'tiny-invariant';

interface CertificateProps extends StackProps {}

/**
 * Creates reference to Certificate Manager SSL certificate that's shared between resources
 */
export class Certificate extends Stack {
	public readonly certificate: certificateManager.ICertificate;

	constructor(scope: Construct, id: string, props: CertificateProps) {
		super(scope, id, props);

		const certificateArn = this.node.tryGetContext('certificateArn');
		const domainName = this.node.tryGetContext('domainName');

		invariant(certificateArn);
		invariant(domainName);

		this.certificate = certificateManager.Certificate.fromCertificateArn(
			this,
			'Certificate',
			certificateArn
		);
	}
}
