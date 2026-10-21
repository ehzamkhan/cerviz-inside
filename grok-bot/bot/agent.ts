import { defineAgent } from "@cursor/bdk";

export default defineAgent({
  name: "Grok Bot",
  description:
    "Grok assistant that calls APIs already connected to the Cursor account, using that account's stored tokens.",
  model: {
    id: "grok-4.5",
    params: [
      { id: "effort", value: "high" },
      { id: "fast", value: "true" },
    ],
  },
});
