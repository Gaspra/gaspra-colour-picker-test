---
name: development-tracker
description: Record durable, project-local history for completed AI-agent tasks. Use when work needs a handoff record, decisions and validation must be preserved, an agent codename or role must be registered, or a user asks to track completed development work or project history.
---

# Development Tracker

Record completed work in `.agents/development`. Keep the skill reusable; never store project history inside the skill directory.

A single conversation thread (or task sequence) corresponds to a single agent codename. All prompts within the same conversation thread must reuse the same codename to record their persona and chronological activity journal.

## Start of task

1. **Identify the Conversation ID**: Get the current Conversation ID from the session metadata or logs.
2. **Resolve the Agent Codename**:
   - Check the agent roster in `.agents/development/development-agents.md`. If the current `Conversation ID` is already listed, reuse that codename.
   - If the user explicitly provided or requested a codename to assume/resume, use that codename.
   - Otherwise, create a unique, human-readable codename of three random lowercase words joined by hyphens (e.g. `orange-envelope-butterfly`). Check the roster first to ensure it is not already in use.
3. **Register Agent Persona & Role**:
   - Choose a concise role that best describes the task or persona (e.g., `Developer`, `Project Manager`).
   - If this is a new agent codename:
     - Create the agent directory `.agents/development/<codename>/`.
     - Create `.agents/development/<codename>/agent.md` using the format below.
     - Add the agent to the roster in `.agents/development/development-agents.md`, mapping it to the current `Conversation ID`.
   - If resuming an existing agent codename:
     - Add the current `Conversation ID` to the agent's entry in `.agents/development/development-agents.md` if it is not already listed.
4. **Load Instructions**:
   - If `.agents/development/<codename>/instructions.md` exists in the agent directory, read it. Use this file as the primary source of requirements and task definition.

### format for `agent.md`
```markdown
# Agent: <codename>

- **Assigned Role**: <role>
- **Active Conversation IDs**:
  - `<Conversation ID 1>`
  - `<Conversation ID 2>`

## Persona & Context

<Brief description of the agent's purpose, background instructions, and context details.>
```

## Complete a task/prompt

Each time a prompt/task completes work in the project (adding, updating, or deleting files):
1. **Update Instructions Progress** (if applicable):
   - Mark checklist items as completed `[x]` in `.agents/development/<codename>/instructions.md`.
   - If all instructions are completed, update the header in `instructions.md` to set `Status: Completed`.
2. **Append to Agent Journal**: Add a chronological entry to `.agents/development/<codename>/journal.md`. If the journal does not exist, create it. Use the format below for journal entries.
3. **Update Index**: Update `.agents/development/development-agents.md`:
   - Under `Recent completed work`, prepend one newest-first entry linking to the updated `journal.md` with a one-line summary of the prompt's outcome.
4. **Verify**: Ensure the journal entry is correctly formatted, all file links use relative paths or workspace-friendly URLs, and the Recent completed work link resolves correctly.

### format for `journal.md`
```markdown
# Activity Journal: <codename>

## [<ISO 8601 Timestamp>] - <Task Title>

- **Time to Complete**: <duration>
- **Key Outcomes**:
  - <Summary of files created, modified, or deleted, e.g. modified [AGENTS.md](file:///path/to/AGENTS.md)>
- **Key Decisions**:
  - <Decisions and rationale, or `None beyond completing the requested task.`>
- **Validation**:
  - <Checks performed and their outcome, or `Not applicable.`>
- **Follow-ups**:
  - <Required follow-up, or `None.`>

---
```

## Boundaries

- Keep journal entries compact. Focus on outcomes, decisions, and validations; do not reproduce full prompts, terminal command outputs, or file-by-file diffs.
- Do not overwrite previous entries in `journal.md` when logging new outcomes. Always append new entries to the end or beginning of the journal file.
- Do not modify unrelated agent history.
