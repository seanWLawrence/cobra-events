import { resolve } from 'path';
import { Construct } from 'constructs';
import { Duration, StackProps, Stack } from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as elasticBeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as actions from 'aws-cdk-lib/aws-codepipeline-actions';
import invariant from 'tiny-invariant';

interface PipelineProps extends StackProps {
	readonly branch: string;
	readonly application: elasticBeanstalk.CfnApplication;
}

/**
 * Creates a CodePipeline that deploys to ElasticBeanstalk on push to GitHub
 */
export class Pipeline extends Stack {
	constructor(scope: Construct, id: string, props: PipelineProps) {
		super(scope, id, props);

		const connectionArn = this.node.tryGetContext('codestarConnectionArn');
		const repo = this.node.tryGetContext('repo');
		const owner = this.node.tryGetContext('owner');

		invariant(props.application.applicationName);
		invariant(connectionArn);
		invariant(repo);
		invariant(owner);

		const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
			pipelineName: props.application.applicationName
		});

		const sourceArtifact = new codepipeline.Artifact('Source');

		pipeline.addStage({
			stageName: 'Source',
			actions: [
				new actions.CodeStarConnectionsSourceAction({
					actionName: 'GitHub',
					output: sourceArtifact,
					connectionArn,
					repo,
					owner,
					branch: props.branch,
					triggerOnPush: true
				})
			]
		});

		const buildArtifact = new codepipeline.Artifact('Build');

		pipeline.addStage({
			stageName: 'Build',
			actions: [
				new actions.CodeBuildAction({
					actionName: 'Build',
					input: sourceArtifact,
					project: new codebuild.PipelineProject(this, 'Project', {
						buildSpec: codebuild.BuildSpec.fromSourceFilename(
							resolve(process.cwd(), 'buildspec.yaml')
						),
						timeout: Duration.minutes(5),
						logging: { cloudWatch: { enabled: true } },
						environment: { buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_4 }
					}),
					outputs: [buildArtifact]
				})
			]
		});

		pipeline.addStage({
			stageName: 'Deploy',
			actions: [
				new actions.ElasticBeanstalkDeployAction({
					actionName: 'Deploy',
					applicationName: props.application.applicationName,
					environmentName: props.branch,
					input: buildArtifact
				})
			]
		});
	}
}
