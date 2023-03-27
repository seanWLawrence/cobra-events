import { ApiHandler } from "sst/node/api";
import { Time } from "@cobra-events/core/time";

export const handler = ApiHandler(async (_evt) => {
  return {
    body: `Hello world. The time is ${Time.now()}`,
  };
});
