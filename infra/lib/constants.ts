import type * as types from "./types";

export const context = {
  appName: "appName",
  domain: "domain",
  githubOwner: "githubOwner",
  apiCertificateArn: "apiCertificateArn",
  iamChangesNotificationEmails: "iamChangesNotificationEmails",
  codestarConnectionArn: "codestarConnectionArn",
  budgetsNotificationEmails: "budgetsNotificationEmails",
};

export const branch: Record<types.Branch, types.Branch> = {
  dev: "dev",
  main: "main",
};
