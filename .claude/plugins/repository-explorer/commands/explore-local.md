---
description: Explore and analyze a local codebase
---

Analyze a local codebase using the repository-explorer agent.

When the user runs this command, they want to explore and understand a local project's code structure, patterns, and content.

## Usage

The user should provide a path to a local directory:
- Absolute path (e.g., /Users/username/projects/my-app)
- Relative path (e.g., ./src, ../other-project)
- Current directory (use "." or omit)

## Your Responsibilities

1. **Extract directory path** from the user's input (default to current directory if not specified)
2. **Convert relative paths to absolute paths** if needed
3. **Launch the repository-explorer agent** to analyze the codebase
4. **Provide the agent with clear instructions** about what to analyze

## Example Usage

```
/explore-local
/explore-local ./src
/explore-local /Users/username/projects/my-app
/explore-local . - find all authentication-related code
```

## What to Tell the Agent

Provide the repository-explorer agent with a task that includes:
- The directory path to analyze (absolute path)
- Any specific focus areas mentioned by the user
- Default instruction: "Analyze this local directory: [path]. Provide an overview of the codebase structure, main components, and key patterns. Use `npx repomix@latest [path]` to pack the codebase, then analyze the generated output file."

## Command Flow

1. Parse the directory path from user input (default to current directory)
2. Resolve to absolute path
3. Identify any specific questions or focus areas
4. Launch repository-explorer agent with a clear task description
5. The agent will:
   - Run `npx repomix@latest [path]`
   - Analyze the generated output file
   - Report findings

Remember: The agent will handle all the details of running repomix CLI, searching, and analyzing. Your job is to launch it with the right context about which directory to analyze.
