import { SSTConfig } from "sst";
import invariant from "tiny-invariant";
import { WebStack } from "./stacks/WebStack";

export default {
  config(_input) {
    return {
      name: process.env.NAME || "cobra-events",
      region: process.env.AWS_REGION || "us-east-1",
    };
  },
  stacks(app) {
    const domainName = process.env.DOMAIN_NAME || "cobra.events";
    const certificateArn = process.env.CERTIFICATE_ARN;
    invariant(domainName);
    invariant(certificateArn);

    app.stack(WebStack({ domainName, certificateArn }));
  },
} satisfies SSTConfig;
