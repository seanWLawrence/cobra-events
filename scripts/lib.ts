/**
 * Constants
 */
export const GITHUB_OWNER = 'GITHUB_OWNER';
export const GITHUB_REPO = 'GITHUB_REPO';
export const GITHUB_TOKEN = 'GITHUB_TOKEN';
export const GITHUB_BRANCH = 'GITHUB_BRANCH';
export const AWS_PROFILE = 'AWS_PROFILE';

interface EnvVars {
	[name: string]: string | undefined;
}

interface MissingEnvVarsPayload {
	hasMissingEnvVars: boolean;
	missingEnvVars: Set<string>;
}

/**
 * Gets missing environment variables, if present
 */
const getMissingEnvVars = (
	envVars: EnvVars,
	requiredEnvVars: Set<string>
): MissingEnvVarsPayload => {
	const missingEnvVars: Set<string> = Object.entries(envVars).reduce((result, [envVar, value]) => {
		const isMissing = !value && requiredEnvVars.has(envVar);

		if (isMissing) {
			result.add(envVar);
		}

		return result;
	}, new Set<string>());

	return { hasMissingEnvVars: missingEnvVars.size > 0, missingEnvVars };
};

/**
 * Formats missing environment variables for output in the custom error message
 */
const missingEnvVarsAsString = (missingEnvVars: Set<string>): string => {
	return Array.from(missingEnvVars)
		.map((envVar) => `'${envVar}'`)
		.join(', ');
};

/**
 * Custom error for missing encvironment variables
 */
class MissingRequiredEnvVarsError extends Error {
	constructor(missingEnvVars: Set<string>) {
		super(
			`No values found for required environment variables: ${missingEnvVarsAsString(
				missingEnvVars
			)}`
		);

		this.name = 'MISSING_REQUIRED_ENV_VARS';
	}
}

/**
 * Retrieves an object with the envVar names and values as key/value pairs
 */
export const getEnvVars = (envVarNames: Set<string>): EnvVars => {
	return Array.from(envVarNames).reduce((result, envVar) => {
		return { ...result, [envVar]: process.env[envVar] };
	}, {});
};

/**
 * Asserts that the required environment variables are present
 */
export const assertRequiredEnvVars = (envVars: EnvVars, requiredEnvVars: Set<string>): void => {
	const { hasMissingEnvVars, missingEnvVars } = getMissingEnvVars(envVars, requiredEnvVars);

	if (hasMissingEnvVars) {
		throw new MissingRequiredEnvVarsError(missingEnvVars);
	}
};
