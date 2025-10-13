---
description: Pack local codebase with Repomix
---

Pack a local codebase using Repomix with AI-optimized format.

When the user asks to pack a local codebase, analyze their request and run the appropriate repomix command.

## User Intent Examples

The user might ask in various ways:
- "Pack this codebase"
- "Pack the src directory"
- "Pack this project as markdown"
- "Pack TypeScript files only"
- "Pack with compression and copy to clipboard"
- "Pack this project including git history"

## Your Responsibilities

1. **Understand the user's intent** from natural language
2. **Determine the appropriate options**:
   - Which directory to pack (default: current directory)
   - Output format: xml (default), markdown, json, or plain
   - Whether to compress (for large codebases)
   - File patterns to include/ignore
   - Additional features (copy to clipboard, include git diffs/logs)
3. **Execute the command** with: `npx repomix [directory] [options]`

## Available Options

- `--style <format>`: Output format (xml, markdown, json, plain)
- `--include <patterns>`: Include only matching patterns (e.g., "src/**/*.ts,**/*.md")
- `--ignore <patterns>`: Additional ignore patterns
- `--compress`: Enable Tree-sitter compression (~70% token reduction)
- `--output <path>`: Custom output path
- `--copy`: Copy output to clipboard
- `--include-diffs`: Include git diff output
- `--include-logs`: Include git commit history

## Command Examples

Based on user intent, you might run:

```bash
# "Pack this codebase"
npx repomix

# "Pack the src directory"
npx repomix src/

# "Pack as markdown with compression"
npx repomix --style markdown --compress

# "Pack only TypeScript and Markdown files"
npx repomix --include "src/**/*.ts,**/*.md"

# "Pack and copy to clipboard"
npx repomix --copy

# "Pack with git history"
npx repomix --include-diffs --include-logs
```

Remember: Parse the user's natural language request and translate it into the appropriate repomix command.
