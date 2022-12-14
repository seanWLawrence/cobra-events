import type * as types from "./types";

export const context = {
  appName: "appName",
  domain: "domain",
  githubOwner: "githubOwner",
  apiCertificateArn: "apiCertificateArn",
  iamChangesNotificationEmail: "iamChangesNotificationEmail",
  codestarConnectionArn: "codestarConnectionArn",
};

export const branch: Record<types.Branch, types.Branch> = {
  dev: "dev",
  main: "main",
};
