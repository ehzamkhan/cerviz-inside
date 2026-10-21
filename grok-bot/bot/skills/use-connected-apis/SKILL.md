---
description: Use when a request should go through an API already connected on the Cursor account, including mail, calendar, files, spreadsheets, slides, hosting, domains, DNS, social posting, design, or CRM. Also use when a connector tool name is unknown or a call fails for authorization.
---

# Use connected API tokens

The `account` connection forwards every HTTP/SSE connector authorized on
the signed-in Cursor account. Tool calls run on the Cursor backend with
that account's stored tokens. This bot does not hold those tokens.

1. Call `list_account_connectors` when the right tool name is not already
   obvious from the tools on this turn.
2. Match the request to a listed tool. Prefer a tool whose annotation
   says it is read-only when the person only asked to look something up.
3. Call that connector tool with the arguments its schema requires.
4. For a send, post, publish, purchase, delete, deploy, or DNS change,
   restate the exact action and wait for an explicit yes before calling.
5. Reply with the outcome. Leave out tokens, keys, and authorization
   headers even if a tool result includes them.

If `list_account_connectors` returns an error for `account`, the host is
not signed in or the connector is not authorized on that Cursor account.
Say that. Do not ask for a token and do not invent a fallback URL.

Connector names come from the Cursor account, not from this skill. A
name you remember from another session is only a hint until the list
confirms it.
