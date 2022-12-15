import * as cdk from "aws-cdk-lib";
import * as logs from "aws-cdk-lib/aws-logs";
import * as certificateManager from "aws-cdk-lib/aws-certificatemanager";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Construct } from "constructs";

import * as constants from "../../constants";
import type * as types from "../../types";
import { ApiSchemaAndResolvers } from "./api-schema-and-resolvers.construct";

export interface ApiProps extends cdk.StackProps {
  readonly branch: types.Branch;
}

export class Api extends cdk.Stack {
  public readonly graphqlApi: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id, props);

    const domainName = `${props.branch}.api.${this.node.tryGetContext(
      constants.context.domain
    )}`;

    const certificate = certificateManager.Certificate.fromCertificateArn(
      this,
      "Certificate",
      this.node.tryGetContext(constants.context.apiCertificateArn)
    );
    this.graphqlApi = new appsync.GraphqlApi(this, "GraphQLApi", {
      name: this.node.tryGetContext(constants.context.appName),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.IAM,
        },
      },
      domainName: {
        domainName,
        certificate,
      },
      logConfig: {
        excludeVerboseContent: true,
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
        retention: logs.RetentionDays.ONE_MONTH,
      },
      xrayEnabled: false,
    });

    new ApiSchemaAndResolvers(this, "ApiSchemaAndResolvers", {
      graphqlApi: this.graphqlApi,
    });
  }
}
