---
description: Pack and analyze a remote GitHub repository
argument-hint: <repo-url-or-owner/repo> [options]
---

Fetch and analyze a GitHub repository using Repomix.

This command will:
1. Clone the remote repository
2. Package it into an AI-friendly format
3. Provide analysis-ready output with file statistics and token count

Supported repository formats:
- `owner/repo` (e.g., yamadashy/repomix)
- `https://github.com/owner/repo`
- `https://github.com/owner/repo/tree/branch-name`
- `https://github.com/owner/repo/commit/hash`

Available options:
- `--style <format>`: Output format (xml, markdown, json, plain)
- `--include <patterns>`: Include only matching patterns (e.g., "src/**/*.ts,**/*.md")
- `--ignore <patterns>`: Additional ignore patterns
- `--compress`: Enable Tree-sitter compression (~70% token reduction)
- `--output <path>`: Custom output path
- `--copy`: Copy output to clipboard

Examples:
```bash
# Pack GitHub repository
/pack-remote yamadashy/repomix

# Pack with full URL
/pack-remote https://github.com/facebook/react

# Pack specific branch
/pack-remote https://github.com/user/repo/tree/develop

# Pack with compression
/pack-remote microsoft/vscode --compress

# Pack TypeScript files only
/pack-remote owner/repo --include "src/**/*.ts"

# Pack and copy to clipboard
/pack-remote yamadashy/repomix --copy --style markdown
```

Run: npx repomix --remote $1 ${@:2}
