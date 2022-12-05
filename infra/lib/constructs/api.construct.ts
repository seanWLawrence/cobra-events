import * as logs from "aws-cdk-lib/aws-logs";
import * as certificateManager from "aws-cdk-lib/aws-certificatemanager";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";

import * as constants from "../constants";
import * as internalConstructs from "./internal/index.construct";

export interface ApiProps {}

export class Api extends Construct {
  public readonly graphqlApi: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: ApiProps = {}) {
    super(scope, id);

    this.graphqlApi = new appsync.GraphqlApi(this, "GraphQLApi", {
      name: this.node.tryGetContext(constants.context.appName),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.IAM,
        },
      },
      domainName: {
        domainName: `api.${this.node.tryGetContext(constants.context.domain)}`,
        certificate: certificateManager.Certificate.fromCertificateArn(
          this,
          "Certificate",
          this.node.tryGetContext(constants.context.apiCertificateArn)
        ),
      },
      logConfig: {
        excludeVerboseContent: true,
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
        retention: logs.RetentionDays.ONE_MONTH,
      },
      xrayEnabled: false,
    });

    new internalConstructs.ApiSchemaAndResolvers(
      this,
      "ApiSchemaAndResolvers",
      { graphqlApi: this.graphqlApi }
    );
  }
}
