import { defineTool } from "@cursor/bdk/tools";
import * as z from "zod/v4";

const DESCRIPTION_LIMIT = 240;

type ListedTool = {
  name: string;
  description: string;
  readOnly: boolean | null;
  destructive: boolean | null;
};

type ListedConnection = {
  name: string;
  tools: ListedTool[];
  error?: string;
};

type ListAccountConnectorsResult = {
  connections: ListedConnection[];
  usesAccountTokens: true;
};

function publicText(value: string): string {
  const compact = value.replace(/\s+/g, " ").trim();
  const redacted = compact
    .replace(/Bearer\s+\S+/gi, "Bearer [redacted]")
    .replace(/\b(?:sk|pk|rk|xox[baprs])-[A-Za-z0-9_-]{8,}\b/g, "[redacted]");
  if (redacted.length <= DESCRIPTION_LIMIT) return redacted;
  return `${redacted.slice(0, DESCRIPTION_LIMIT)}…`;
}

export default defineTool({
  description:
    "List APIs connected through the Cursor account and the tools they expose. Uses stored account tokens. Never returns tokens, headers, or secrets. Call this before guessing a connector tool name.",
  effect: "read",
  inputSchema: z.object({}),
  async execute(_input, ctx): Promise<ListAccountConnectorsResult> {
    const connections: ListedConnection[] = [];
    for (const name of ctx.host.mcp.names()) {
      try {
        const tools = await ctx.host.mcp.listTools(name);
        connections.push({
          name,
          tools: tools.map((tool) => ({
            name: tool.name,
            description: publicText(tool.description ?? ""),
            readOnly: tool.annotations?.readOnlyHint ?? null,
            destructive: tool.annotations?.destructiveHint ?? null,
          })),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        connections.push({
          name,
          tools: [],
          error: publicText(message),
        });
      }
    }
    return { connections, usesAccountTokens: true };
  },
});
