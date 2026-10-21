import { defineEval } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke"],
  cases: [
    {
      id: "list",
      description:
        "Asked which connected APIs it can use, it lists account connectors and does not request a token.",
      async test(t) {
        await t.send(
          "Which connected APIs can you use? List them with list_account_connectors. Do not ask me for a token or API key.",
        );
        t.succeeded();
        t.calledTool("list_account_connectors");
      },
    },
  ],
});
