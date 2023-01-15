/**
 * Sets up your GitHub repo for Release Please
 */

import { config as loadDotEnvFile } from 'dotenv';
import { spawnSync } from 'node:child_process';

import {
	assertRequiredEnvVars,
	getEnvVars,
	GITHUB_OWNER,
	GITHUB_REPO,
	GITHUB_TOKEN
} from './lib.js';

loadDotEnvFile();

const requiredEnvVars = new Set([GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN]);
const envVars = getEnvVars(requiredEnvVars);

assertRequiredEnvVars(envVars, requiredEnvVars);

console.info(
	'Bootstrapping release-please. See https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md for more details.'
);

const release = spawnSync('npx', [
	'release-please',
	'bootstrap',
	`--token=${envVars[GITHUB_TOKEN]}`,
	`--repo-url=${envVars[GITHUB_OWNER]}/${envVars[GITHUB_REPO]}`,
	'--release-type=node'
]);

console.log(release.output.toString());

console.info('Done.');

export {};
