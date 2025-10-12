import { defineConfig } from './src/index.js';

export default defineConfig({
  input: {
    maxFileSize: 50000000,
  },
  output: {
    filePath: 'repomix-output.xml',
    style: 'xml',
    parsableStyle: false,
    compress: false,
    headerText: `This repository contains the source code for the Repomix tool.
Repomix is designed to pack repository contents into a single file,
making it easier for AI systems to analyze and process the codebase.

Key Features:
- Configurable ignore patterns
- Custom header text support
- Efficient file processing and packing

Please refer to the README.md file for more detailed information on usage and configuration.
`,
    instructionFilePath: 'repomix-instruction.md',
    fileSummary: true,
    directoryStructure: true,
    files: true,
    removeComments: false,
    removeEmptyLines: false,
    topFilesLength: 5,
    showLineNumbers: false,
    includeEmptyDirectories: true,
    truncateBase64: true,
    tokenCountTree: 50000,
    git: {
      sortByChanges: true,
      sortByChangesMaxCommits: 100,
      includeDiffs: true,
      includeLogs: true,
      includeLogsCount: 50,
    },
  },
  include: [],
  ignore: {
    useGitignore: true,
    useDefaultPatterns: true,
    // ignore is specified in .repomixignore
    customPatterns: [],
  },
  security: {
    enableSecurityCheck: true,
  },
  tokenCount: {
    encoding: 'o200k_base',
  },
});
