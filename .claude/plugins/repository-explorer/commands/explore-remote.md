---
description: Explore and analyze a remote GitHub repository
---

Analyze a remote GitHub repository using the repository-explorer agent.

When the user runs this command, they want to explore and understand a remote repository's code structure, patterns, and content.

## Usage

The user should provide a GitHub repository in one of these formats:
- `owner/repo` (e.g., yamadashy/repomix)
- Full GitHub URL (e.g., https://github.com/facebook/react)
- URL with branch (e.g., https://github.com/user/repo/tree/develop)

## Your Responsibilities

1. **Extract repository information** from the user's input
2. **Launch the repository-explorer agent** to analyze the repository
3. **Provide the agent with clear instructions** about what to analyze

## Example Usage

```
/explore-remote yamadashy/repomix
/explore-remote https://github.com/facebook/react
/explore-remote microsoft/vscode - show me the main architecture
```

## What to Tell the Agent

Provide the repository-explorer agent with a task that includes:
- The repository to analyze (URL or owner/repo format)
- Any specific focus areas mentioned by the user
- Default instruction: "Analyze this remote repository: [repo]. Provide an overview of the repository structure, main components, and key patterns. Use `npx repomix@latest --remote [repo]` to pack the repository, then analyze the generated output file."

## Command Flow

1. Parse the repository information from user input
2. Identify any specific questions or focus areas
3. Launch repository-explorer agent with a clear task description
4. The agent will:
   - Run `npx repomix@latest --remote <repo>`
   - Analyze the generated output file
   - Report findings

Remember: The agent will handle all the details of running repomix CLI, searching, and analyzing. Your job is to launch it with the right context about which repository to analyze.
