import { RemixSite, type StackContext } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

interface WebStackProps {
  domainName: string;
  certificateArn: string;
}

export function WebStack(props: WebStackProps) {
  return ({ stack }: StackContext): void => {
    const site = new RemixSite(stack, "Site", {
      path: "web/",
      customDomain: {
        isExternalDomain: true,
        domainName: props.domainName,
        cdk: {
          certificate: Certificate.fromCertificateArn(
            stack,
            "Certificate",
            props.certificateArn
          ),
        },
      },
    });

    stack.addOutputs({
      URL: site.url || "localhost:3000",
    });
  };
}
