import * as logs from "aws-cdk-lib/aws-logs";
import * as certificateManager from "aws-cdk-lib/aws-certificatemanager";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import pluralize from "pluralize";
import { Construct } from "constructs";

import * as constants from "../constants";

export interface ApiProps {}

export class Api extends Construct {
  public readonly graphqlApi: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: ApiProps) {
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
        certificate: new certificateManager.Certificate(this, "Certificate", {
          domainName: this.node.tryGetContext(constants.context.domain),
          validation: certificateManager.CertificateValidation.fromDns(),
        }),
      },
      logConfig: {
        excludeVerboseContent: true,
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
        retention: logs.RetentionDays.ONE_MONTH,
      },
      xrayEnabled: false,
    });

    const node = new appsync.InterfaceType("Node", {
      definition: { id: appsync.GraphqlType.id({ isRequired: true }) },
    });

    const interfaces = {
      node,
    };

    Object.values(interfaces).forEach((interfaceType) => {
      this.graphqlApi.addType(interfaceType);
    });

    const socialMediaPlatform = new appsync.EnumType("SocialMediaPlatform", {
      definition: ["YOUTUBE", "FACEBOOK", "INSTAGRAM", "TIKTOK", "TWITTER"],
    });

    const enums = {
      socialMediaPlatform,
    };

    Object.values(enums).forEach((enumType) => {
      this.graphqlApi.addType(enumType);
    });

    const toEdge = (base: appsync.ObjectType): appsync.ObjectType => {
      return new appsync.ObjectType(`${base.name}Edge`, {
        definition: {
          node: base.attribute({ isRequired: true }),
          nextToken: appsync.GraphqlType.string(),
        },
      });
    };

    const toConnection = (
      base: appsync.ObjectType,
      edge: appsync.ObjectType
    ): appsync.ObjectType => {
      return new appsync.ObjectType(`${base.name}Connection`, {
        definition: {
          edges: edge.attribute({ isRequiredList: true }),
          [pluralize(base.name)]: base.attribute({ isRequiredList: true }),
          totalCount: appsync.GraphqlType.int({ isRequired: true }),
        },
      });
    };

    const socialMediaProfile = new appsync.ObjectType(
      "SocialMediaProfileNode",
      {
        interfaceTypes: [interfaces.node],
        definition: {
          platform: enums.socialMediaPlatform.attribute({ isRequired: true }),
          url: appsync.GraphqlType.awsUrl({ isRequired: true }),
        },
      }
    );

    const artist = new appsync.ObjectType("ArtistNode", {
      interfaceTypes: [interfaces.node],
      definition: {
        name: appsync.GraphqlType.string({ isRequired: true }),
        bio: appsync.GraphqlType.string({ isRequired: true }),
        socialMediaProfiles: socialMediaProfile.attribute({
          isRequiredList: true,
        }),
      },
    });

    const nodes = {
      socialMediaProfile,
      artist,
    };

    Object.values(nodes).forEach((node) => {
      const edge = toEdge(node);

      this.graphqlApi.addType(node);
      this.graphqlApi.addType(edge);
      this.graphqlApi.addType(toConnection(node, edge));
    });

    const stubDataSource = new appsync.NoneDataSource(this, "StubDataSource", {
      api: this.graphqlApi,
      name: "Stub",
      description: "Stubbed data source for testing the API schema",
    });

    this.graphqlApi.addQuery(
      "artist",
      new appsync.ResolvableField({
        args: { id: appsync.GraphqlType.id({ isRequired: true }) },
        returnType: nodes.artist.attribute({ isRequired: false }),
        dataSource: stubDataSource,
        responseMappingTemplate: appsync.MappingTemplate.fromString(
          JSON.stringify(
            {
              id: "some id",
              name: "Some band",
              bio: "Some bio",
              socialMediaProfiles: [
                {
                  id: "some id",
                  platform: "YOUTUBE",
                  url: "https://youtube.com/some-band",
                },
              ],
            },
            null,
            2
          )
        ),
      })
    );
  }
}
