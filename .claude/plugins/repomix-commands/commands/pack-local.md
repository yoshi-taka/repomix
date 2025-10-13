---
description: Pack local codebase with Repomix
argument-hint: [directory] [options]
---

Pack a local codebase using Repomix with AI-optimized format.

This command will:
1. Package the specified directory (or current directory) into a single AI-friendly file
2. Show file statistics and token count
3. Output to repomix-output.xml by default

Available options:
- `--style <format>`: Output format (xml, markdown, json, plain)
- `--include <patterns>`: Include only matching patterns (e.g., "src/**/*.ts,**/*.md")
- `--ignore <patterns>`: Additional ignore patterns
- `--compress`: Enable Tree-sitter compression (~70% token reduction)
- `--output <path>`: Custom output path
- `--copy`: Copy output to clipboard
- `--include-diffs`: Include git diff output
- `--include-logs`: Include git commit history

Examples:
```bash
# Pack current directory
/pack-local

# Pack specific directory
/pack-local src/

# Pack with options
/pack-local --style markdown --compress

# Pack TypeScript files only
/pack-local --include "src/**/*.ts,**/*.md"

# Pack and copy to clipboard
/pack-local --copy
```

Run: npx repomix $ARGUMENTS
