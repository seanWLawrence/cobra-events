import * as appsync from "@aws-cdk/aws-appsync-alpha";
import pluralize from "pluralize";
import { Construct } from "constructs";

export interface ApiSchemaAndResolversProps {
  readonly graphqlApi: appsync.GraphqlApi;
}

export class ApiSchemaAndResolvers extends Construct {
  private readonly graphqlApi: appsync.GraphqlApi;
  private dataSources: Record<string, appsync.NoneDataSource> = {};
  private interfaces: Record<string, appsync.InterfaceType> = {};
  private enums: Record<string, appsync.EnumType> = {};
  private nodes: Record<string, appsync.ObjectType> = {};

  constructor(scope: Construct, id: string, props: ApiSchemaAndResolversProps) {
    super(scope, id);
    this.graphqlApi = props.graphqlApi;

    this.setDataSources();
    this.setInterfaces();
    this.setEnums();
    this.setNodes();
    this.setQueries();
    this.setMutations();
    this.setSubscriptions();
  }

  private setDataSources(): void {
    this.dataSources = {
      stub: new appsync.NoneDataSource(this, "StubDataSource", {
        api: this.graphqlApi,
        name: "Stub",
        description: "Stubbed data source for testing the API schema",
      }),
    };
  }

  private setInterfaces(): void {
    const node = new appsync.InterfaceType("Node", {
      definition: { id: appsync.GraphqlType.id({ isRequired: true }) },
    });

    this.interfaces = {
      node,
    };

    Object.values(this.interfaces).forEach((interfaceType) => {
      this.graphqlApi.addType(interfaceType);
    });
  }

  private setEnums(): void {
    const socialMediaPlatform = new appsync.EnumType("SocialMediaPlatform", {
      definition: ["YOUTUBE", "FACEBOOK", "INSTAGRAM", "TIKTOK", "TWITTER"],
    });

    this.enums = {
      socialMediaPlatform,
    };

    Object.values(this.enums).forEach((enumType) => {
      this.graphqlApi.addType(enumType);
    });
  }

  private setNodes(): void {
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
        interfaceTypes: [this.interfaces.node],
        definition: {
          platform: this.enums.socialMediaPlatform.attribute({
            isRequired: true,
          }),
          url: appsync.GraphqlType.awsUrl({ isRequired: true }),
        },
      }
    );

    const artist = new appsync.ObjectType("ArtistNode", {
      interfaceTypes: [this.interfaces.node],
      definition: {
        name: appsync.GraphqlType.string({ isRequired: true }),
        bio: appsync.GraphqlType.string({ isRequired: true }),
        socialMediaProfiles: socialMediaProfile.attribute({
          isRequiredList: true,
        }),
      },
    });

    this.nodes = {
      socialMediaProfile,
      artist,
    };

    Object.values(this.nodes).forEach((node) => {
      const edge = toEdge(node);

      this.graphqlApi.addType(node);
      this.graphqlApi.addType(edge);
      this.graphqlApi.addType(toConnection(node, edge));
    });
  }

  private setQueries(): void {
    this.graphqlApi.addQuery(
      "artist",
      new appsync.ResolvableField({
        args: { id: appsync.GraphqlType.id({ isRequired: true }) },
        returnType: this.nodes.artist.attribute({ isRequired: false }),
        dataSource: this.dataSources.stub,
        requestMappingTemplate: appsync.MappingTemplate.fromString(
          JSON.stringify(
            {
              version: "2018-05-29",
              payload: {
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
            },
            null,
            2
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromString(
          "$util.toJson($context.result)"
        ),
      })
    );
  }

  private setMutations(): void {}

  private setSubscriptions(): void {}
}
