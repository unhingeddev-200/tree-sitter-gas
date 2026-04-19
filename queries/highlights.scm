(directive "." @keyword name: _ @keyword arg: _ @character)
(directive "." @keyword name: _ @keyword arg: (txt) @string)
(directive "." @keyword name: _ @keyword)
(inst (sym) @type.builtin)
(inst (sym) @type (operand) @markup.link)
(imm (sym) @character) @markup.strong
(register (name) @type) @markup.strong
(macro_var (sym) @character) @markup.strong
(dir_mem "*" @diff.plus)
(label) @label
(comment) @comment
(num) @number
(txt) @string
