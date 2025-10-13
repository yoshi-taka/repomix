# Claude Code Plugins

Repomix provides official plugins for [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) that integrate seamlessly with the AI-powered development environment. These plugins make it easy to analyze and pack codebases directly within Claude Code using natural language commands.

## Available Plugins

### 1. repomix-mcp (MCP Server Plugin)

Foundation plugin that provides AI-powered codebase analysis through MCP server integration.

**Features:**
- Pack local and remote repositories
- Search through packed outputs
- Read files with built-in security scanning ([Secretlint](https://github.com/secretlint/secretlint))
- Automatic Tree-sitter compression (~70% token reduction)

### 2. repomix-commands (Slash Commands Plugin)

Provides convenient slash commands for quick operations with natural language support.

**Available Commands:**
- `/repomix-commands:pack-local` - Pack local codebase with various options
- `/repomix-commands:pack-remote` - Pack and analyze remote GitHub repositories

## Installation

### 1. Add the Repomix Plugin Marketplace

First, add the Repomix plugin marketplace to Claude Code:

```text
/plugin marketplace add yamadashy/repomix
```

### 2. Install Plugins

Install the plugins using the following commands:

```text
# Install MCP server plugin (recommended foundation)
/plugin install repomix-mcp@repomix

# Install commands plugin (extends functionality)
/plugin install repomix-commands@repomix
```

::: tip Plugin Relationship
The `repomix-mcp` plugin is recommended as a foundation, and `repomix-commands` extends it with convenient slash commands. While you can install them independently, using both provides the most comprehensive experience.
:::

### Alternative: Interactive Installation

You can also use the interactive plugin installer:

```text
/plugin
```

This opens an interactive interface where you can browse and install available plugins.

## Usage Examples

### Packing a Local Codebase

Use the `/repomix-commands:pack-local` command with natural language instructions:

```text
/repomix-commands:pack-local
Pack this project as markdown with compression
```

Other examples:
- "Pack the src directory only"
- "Pack TypeScript files with line numbers"
- "Generate output in JSON format"

### Packing a Remote Repository

Use the `/repomix-commands:pack-remote` command to analyze GitHub repositories:

```text
/repomix-commands:pack-remote yamadashy/repomix
Pack only TypeScript files from the yamadashy/repomix repository
```

Other examples:
- "Pack the main branch with compression"
- "Include only documentation files"
- "Pack specific directories"

## Benefits

### Seamless Integration
Claude can directly analyze codebases without manual file preparation or command-line operations.

### Natural Language Support
Use conversational commands instead of remembering complex CLI syntax. Simply describe what you want in natural language.

### Always Up-to-Date
The plugins automatically use `npx repomix@latest`, ensuring you always have access to the latest features and improvements.

### Security Built-in
Automatic Secretlint scanning prevents sensitive data (API keys, passwords, secrets) from being exposed in packed outputs.

### Token Optimization
Tree-sitter compression reduces token count by ~70% while preserving code structure, making it efficient for large codebases.

## Advanced Features

### Tree-sitter Compression

When packing large codebases, you can request compression to reduce token usage:

```text
/repomix-commands:pack-local
Pack this codebase with tree-sitter compression
```

This extracts essential code signatures and structure while removing implementation details, significantly reducing token count.

### Custom Include/Ignore Patterns

You can specify which files to include or exclude:

```text
/repomix-commands:pack-local
Pack only TypeScript files in src directory, ignore test files
```

### Output Format Selection

Choose your preferred output format:

```text
/repomix-commands:pack-local
Generate output in JSON format for API processing
```

Supported formats:
- XML (default)
- Markdown
- JSON
- Plain text

## Troubleshooting

### Plugin Not Found

If the plugin is not found after installation, try:

1. Refresh Claude Code
2. Verify the marketplace was added correctly: `/plugin marketplace list`
3. Reinstall the plugin: `/plugin install repomix-mcp@repomix`

### Command Not Working

If slash commands aren't recognized:

1. Ensure both plugins are installed (commands plugin requires MCP plugin)
2. Check that you're using the correct command format: `/repomix-commands:pack-local`
3. Verify the plugins are enabled: `/plugin list`

### Security Warnings

If you see security warnings about sensitive files:

1. Review the flagged files carefully
2. Ensure no API keys, passwords, or secrets are in your codebase
3. Use `.repomixignore` to exclude sensitive files

## Related Resources

- [MCP Server Documentation](/guide/mcp-server) - Learn about the underlying MCP server
- [Configuration](/guide/configuration) - Customize Repomix behavior
- [Security](/guide/security) - Understanding security features
- [Command Line Options](/guide/command-line-options) - Available CLI options

## Plugin Source Code

The plugin source code is available in the Repomix repository:

- [Plugin Marketplace](https://github.com/yamadashy/repomix/tree/main/.claude-plugin)
- [MCP Plugin](https://github.com/yamadashy/repomix/tree/main/.claude/plugins/repomix-mcp)
- [Commands Plugin](https://github.com/yamadashy/repomix/tree/main/.claude/plugins/repomix-commands)

## Feedback and Support

If you encounter issues or have suggestions for the Claude Code plugins:

- [Open an issue on GitHub](https://github.com/yamadashy/repomix/issues)
- [Join our Discord community](https://discord.gg/wNYzTwZFku)
- [View existing discussions](https://github.com/yamadashy/repomix/discussions)
