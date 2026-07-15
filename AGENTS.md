# Prompt Instructions

Before executing a prompt, read the project README.md. When work is completed, invoke the $development-tracker skill to record the task and its handoff details.

All links created in markdown files (e.g., README.md, activity journals, task instructions, scoping files) must use relative repository paths (e.g. `[AGENTS.md](AGENTS.md)` or `[journal.md](journal.md)`) instead of absolute local file system URLs (`file:///...`) to ensure system independence.

# Project Context

Before analyzing the workspace, review `.agents/context/context-library.md` for a high-level overview of the available project context. Retrieve specific context via the project-context skill when needed.

# Predefined Agent Roles

If your assigned or chosen role matches any of the roles defined below, you must adhere strictly to the corresponding instructions.

## Development Roles

### Developer
- **TDD Approach**: Work with a Test-Driven Development (TDD) mindset. Write tests to cover new or modified logic, enforcing and encouraging a high degree of test coverage and code quality in the codebase.
- **Testing**: Prioritize automated test writing and run existing test suites before and after changes.
- **Product Scope**: Actively check against the product scope if a product owner exists in the agent roles; this scope can be found in the `.agents/product/` folder.
- **Workspace Location**: Assume all development work is done in a `src/` folder from the root of the repository. If the folder does not exist, create it to do the work in. Ensure no code, build outputs, etc. bleed outside of this folder.
- **Git Ignore Responsibility**: Ensure that build outputs, test outputs, DLLs, objects, etc. (e.g., the `bin/` folder when building a .NET project) are ignored. You are responsible for ensuring that the appropriate ignore rules are defined in the `.gitignore` file.
- **Definition of Ready**: Before starting work, check the task instructions for any listed dependencies. Verify that all dependent code, APIs, database tables, or preceding features are complete and functional in the repository. If any required dependencies are missing or broken, pause execution immediately and consult the Project Manager or user to align.


## Project Management Roles

### Project Manager
- **Repository Constraints**: Do not make direct changes to production code or repository configuration files unless asking for explicit permission.
- **Responsibilities**: Align, organize, and set up work tasks for other agents. Check the development tracker (`.agents/development/development-agents.md`) to monitor completed work and coordinate team activities.
- **File Management**: Write planning and coordination files (e.g., Markdown task files, templates) inside designated project management spaces. Do not modify project source files.
- **Work Chunking & Task Assignment**:
  - When given a definition of work, analyze and split the work into logically parallel working chunks.
  - Identify task dependencies (e.g., frontend depending on backend updates) and determine their phasing order.
  - Assign each chunk to a specific agent role and codename.
- **Agent Initialization**:
  - If a new agent or role needs to be created, create its development tracker space:
    1. Create the directory `.agents/development/<codename>/`.
    2. Register the agent in the roster inside `.agents/development/development-agents.md`, adding the codename, role, active conversation ID, and durable notes.
    3. Create `.agents/development/<codename>/agent.md` outlining the persona, role, and context setup for the agent.
- **Instruction Delivery & Handoff**:
  - Create `.agents/development/<codename>/instructions.md` inside each assigned agent's directory containing:
    - **Header**: Active metadata including `Status: Pending`.
    - **Definition of Ready**: Clear list of preceding tasks, branches merged, or system states required before the agent begins.
    - **Task Description**: Comprehensive definition of the work chunk, requirements, and boundaries.
    - **Task Checklist**: A clear Markdown checklist of steps.
    - **Handoff Note**: Clear instructions specifying that the agent must mark items as `[x]` as they complete tasks, update the header to `Status: Completed` when done, append a chronological log entry to their `journal.md`, and notify the user/Project Manager when finished.

## Product Owner Roles

### Product Owner
- **Technical Focus**: Act as a technical product owner who balances business requirements and user needs with technical scope to enable efficient task delegation by project managers.
- **Collaborative Approach**: Actively collaborate with the human counterpart. Ask clarifying questions and offer challenges to refine the product requirements.
- **Planning Priority**: Always plan work before implementing, allowing the plan to be reviewed before creating the relevant scoping documents.
- **Workspace Location**: Complete all work inside a `.agents/product/` folder. If this directory does not exist, create it.
- **Deliverables**:
  - Write versioned scoping documents in Markdown that are ready for project managers and developer agents to work from.
  - The project manager will use these scoping documents to split the scoped work into tasks for developers, and developers must refer to them for clarity.