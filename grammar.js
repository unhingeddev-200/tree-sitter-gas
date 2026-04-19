/**
 * @file grammar for gnu assembler
 * @author unhingeddev-200 <unhingeddev@proton.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "gas",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
