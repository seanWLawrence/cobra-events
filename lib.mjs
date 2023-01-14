/**
 * Constants
 */
export const GITHUB_OWNER = 'GITHUB_OWNER';
export const GITHUB_REPO = 'GITHUB_REPO';
export const GITHUB_TOKEN = 'GITHUB_TOKEN';

/**
 * Gets missing environment variables, if present
 * @param {{[name: string]: string | undefined}} envVars - Object containing the environment variables as key/value pairs
 * @param {Set<string>} requiredEnvVars - Set containing the required environment variables
 * @returns {{hasMissingEnvVars: boolean, missingEnvVars: Set<string>}}
 */
const getMissingEnvVars = (envVars, requiredEnvVars) => {
	const defaultResult = { hasMissingEnvVars: false, missingEnvVars: new Set() };

	return Object.entries(envVars).reduce((result, [envVar, value]) => {
		if (!value && requiredEnvVars.has(envVar)) {
			return { hasMissingEnvVars: true, missingEnvVars: result.missingEnvVars.add(envVar) };
		}

		return result;
	}, defaultResult);
};

/**
 * Formats missing environment variables for output in the custom error message
 * @param {Set<string>} missingEnvVars - Set containing names of missing environment variables
 * @returns string
 */
const missingEnvVarsAsString = (missingEnvVars) => {
	return missingEnvVars
		.values()
		.map((envVar) => `'${envVar}'`)
		.join(', ');
};

/**
 * Custom error for missing encvironment variables
 */
class MissingRequiredEnvVarsError extends Error {
	/**
	 *
	 * @param {Set<string>} missingEnvVars - Set containing names of missing environment variables
	 */
	constructor(missingEnvVars) {
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
 * @param  {Set<string>} envVarNames - Environment variable names to retrieve from process.env
 * @returns {{[name: string]: string | undefined}}
 */
export const getEnvVars = (envVarNames) => {
	return Array.from(envVarNames).reduce((result, envVar) => {
		return { ...result, [envVar]: process.env[envVar] };
	}, {});
};

/**
 * Asserts that the required environment variables are present
 * @param {{[name: string]: string | undefined}} envVars - Object with environment variables and their values as key/value pairs
 * @param  {Set<string>} requiredEnvVars - Set containing the required environment variables
 */
export const assertRequiredEnvVars = (envVars, requiredEnvVars) => {
	const { hasMissingEnvVars, missingEnvVars } = getMissingEnvVars(envVars, requiredEnvVars);

	if (hasMissingEnvVars) {
		throw new MissingRequiredEnvVarsError(missingEnvVars);
	}
};
