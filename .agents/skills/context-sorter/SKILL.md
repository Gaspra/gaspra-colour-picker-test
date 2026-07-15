---
name: context-sorter
description: Copy and index documents, files, and folders that should be available as reusable context for agents. Use when asked to add, import, copy, organise, or register material in the repository for agents to use in future prompts, or when a referenced item should become project context.
---

# Context Sorter

Store reusable agent context in `.agents/context` and keep its catalogue accurate.

## Workflow

1. Confirm that the requested material is intended as context for agents. Do not use this skill for application source code, generated output, or ordinary project files unless the user explicitly wants them available as agent context.
2. Read `.agents/context/context-library.md` before making changes. Check the existing context directory and the library for related content or naming conflicts.
3. Copy each supplied file or folder into `.agents/context`. Preserve the contents and internal directory structure of imported folders. Do not move, modify, or delete the original supplied material.
4. Do not overwrite existing context. If the intended destination already exists and the request does not clearly say to update it, ask the user how to proceed.
5. Update `.agents/context/context-library.md` after every import. Record every real file and every folder under `.agents/context` except `context-library.md` and `.gitkeep`.
6. For each library entry, provide the repository-relative path, whether it is a file or folder, a concise factual summary, and when an agent should read or use it. Inspect text-based content when needed to write a useful summary; for binary material, identify its apparent type and purpose from the available information.
7. Verify that every library path exists, every imported item is indexed once, and the index does not contain stale paths.

## Context library format

Use the table in `.agents/context/context-library.md`. Keep one row per indexed file or folder. For a folder, describe its scope; still index each file and nested folder separately so agents can select the smallest relevant item.

## Completion report

State what was copied, which library entries were added or updated, and any material that could not be copied or indexed.
