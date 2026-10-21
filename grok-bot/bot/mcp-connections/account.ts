import { defineConnection } from "@cursor/bdk/connections";

// Forwards every HTTP/SSE connector already authorized on the signed-in
// Cursor account. Each tool call runs on the Cursor backend with that
// account's stored OAuth tokens. Raw tokens never reach this process,
// the session workspace, or traces.
export default defineConnection({
  description:
    "APIs connected on the Cursor account. Calls use the account's stored tokens.",
  cursorAccount: true,
  servers: "*",
  advertiseTools: true,
});
