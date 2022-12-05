import * as cdk from "aws-cdk-lib";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import * as codeBuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";

import * as constants from "../constants";

export interface HostingProps {}

export class Hosting extends Construct {
  public readonly amplifyApp: amplify.App;

  constructor(scope: Construct, id: string, props: HostingProps = {}) {
    super(scope, id);

    this.amplifyApp = new amplify.App(this, "AmplifyApp", {
      appName: this.node.tryGetContext(constants.context.appName),
      environmentVariables: { AMPLIFY_MONOREPO_APP_ROOT: "app" },
      buildSpec: codeBuild.BuildSpec.fromObjectToYaml({
        version: "1.0",
        applications: [
          {
            appRoot: "app",
            frontend: {
              phases: {
                preBuild: {
                  commands: ["npm ci"],
                },
                build: {
                  commands: [
                    // Example for setting environment variables that Next.js can use
                    // "env | grep -e DB_HOST -e DB_USER -e DB_PASS >> .env.production",
                    "npm run build",
                  ],
                },
              },
              artifacts: {
                baseDirectory: ".next",
                files: ["**/*"],
              },
              cache: {
                paths: ["node_modules/**/*", ".next/cache/**/*"],
              },
            },
          },
        ],
      }),
    });

    const dev = this.amplifyApp.addBranch("dev", {
      // basicAuth: amplify.BasicAuth.fromGeneratedPassword("admin"),
    });

    const main = this.amplifyApp.addBranch("main");

    const domain = this.amplifyApp.addDomain(
      this.node.tryGetContext(constants.context.domain),
      {
        enableAutoSubdomain: true,
        autoSubdomainCreationPatterns: ["dev"],
      }
    );

    domain.mapRoot(main);
    domain.mapSubDomain(main, "www");
    domain.mapSubDomain(dev, "dev");
  }
}
