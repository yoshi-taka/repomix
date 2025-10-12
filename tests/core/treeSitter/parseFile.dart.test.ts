import { describe, expect, test } from 'vitest';
import { parseFile } from '../../../src/core/treeSitter/parseFile.js';
import { createMockConfig } from '../../../tests/testing/testUtils.js';

describe('parseFile for Dart', () => {
  test('should parse Dart correctly', async () => {
    const fileContent = `
      /// A simple greeting class
      class Greeter {
        /// The name to greet
        final String name;

        /// Constructor
        Greeter(this.name);

        /// Prints a greeting message
        void greet() {
          print('Hello, $name!');
        }

        /// Returns a greeting message
        String getMessage() {
          return 'Hello, $name!';
        }
      }

      /// Main entry point
      void main() {
        final greeter = Greeter('World');
        greeter.greet();
      }
    `;
    const filePath = 'dummy.dart';
    const config = {};
    const result = await parseFile(fileContent, filePath, createMockConfig(config));
    expect(typeof result).toBe('string');

    const expectContents = [
      '/// A simple greeting class',
      'class Greeter {',
      '/// The name to greet',
      '/// Constructor',
      '/// Prints a greeting message',
      'void greet() {',
      '/// Returns a greeting message',
      'String getMessage() {',
      '/// Main entry point',
      'void main() {',
    ];

    for (const expectContent of expectContents) {
      expect(result).toContain(expectContent);
    }
  });

  test('should parse Dart with imports correctly', async () => {
    const fileContent = `
      import 'dart:async';
      import 'package:flutter/material.dart';

      /// A simple widget
      class MyWidget extends StatelessWidget {
        @override
        Widget build(BuildContext context) {
          return Container();
        }
      }
    `;
    const filePath = 'dummy.dart';
    const config = {};
    const result = await parseFile(fileContent, filePath, createMockConfig(config));
    expect(typeof result).toBe('string');

    const expectContents = [
      "import 'dart:async';",
      "import 'package:flutter/material.dart';",
      '/// A simple widget',
      'class MyWidget extends StatelessWidget {',
    ];

    for (const expectContent of expectContents) {
      expect(result).toContain(expectContent);
    }
  });
});
