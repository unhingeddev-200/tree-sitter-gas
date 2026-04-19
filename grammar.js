/**
 * @file grammar for gnu assembler
 * @author unhingeddev-200 <unhingeddev@proton.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "gas",
  extras: $ => [
    /[ \t]/,
    $.comment
  ],
  rules: {
    source_file: $ => repeat($.line),
    line: $ => choice("\n",$.directive,$.label,$.inst),
    directive: $ => seq(field("name",seq(".",$.sym)),repeat(field("arg",choice(seq($.sym,optional(",")),seq($.txt,optional(","))))),"\n"),
    label: $ => seq($.sym,":"),
    operand: $ => choice(seq($.dir_mem,optional(",")),seq($.sym,optional(",")),seq($.imm,optional(",")),seq($.mem,optional(","))) ,
    dir_mem: $ => seq("*",choice($.sym,$.imm)),
    register: $ => seq("%",$.name),
    imm: $ => seq("$",$.sym),
    inst: $ => seq($.sym,repeat($.operand),"\n"),
    mem: $ => prec(1,seq(optional($.num),"(",$.sym,optional(seq(",",$.sym)),optional(seq(",",$.sym)),")")),
    txt: $ => /".*"/,
    sym: $ => choice($.name,$.macro_var,$.num,$.register),
    macro_var: $ => seq("\\",$.sym),
    num: $ => /[0-9]+/,
    name: $ => /[a-zA-Z_\-]+[0-9]*/,
    comment: $ => /\/\/.*\n/
  }
});
