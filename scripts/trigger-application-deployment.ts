/**
 * Triggers AWS CodePipeline to deploy the application for a branch into Elastic Beanstalk
 */

import { config as loadDotEnvFile } from 'dotenv';
import { spawnSync } from 'node:child_process';

import {
	assertRequiredEnvVars,
	getEnvVars,
	AWS_PROFILE,
	GITHUB_BRANCH,
	GITHUB_REPO
} from './lib.js';

loadDotEnvFile();

const requiredEnvVars = new Set([AWS_PROFILE, GITHUB_BRANCH, GITHUB_REPO]);
const envVars = getEnvVars(requiredEnvVars);

assertRequiredEnvVars(envVars, requiredEnvVars);

console.info(
	`Triggering CodePipeline deployment for '${envVars[GITHUB_REPO]}-${envVars[GITHUB_BRANCH]}' and using AWS profile ${envVars[AWS_PROFILE]}`
);

const deploy = spawnSync('aws', [
	'codepipeline',
	'start-pipeline-execution',
	`--name=${envVars[GITHUB_REPO]}-${envVars[GITHUB_BRANCH]}`,
	`--profile=${envVars[AWS_PROFILE]}`
]);

console.log(deploy.output.toString());

console.info('Done.');
