set shell := ["fish", "-c"]
set script-interpreter := ["fish"]
set unstable := true

TS := "tree-sitter"
INSTALL_DIR := "~/.config/nvim"

highlight: build
    jj squash --ignore-immutable
    nvim --headless -c "TSRestart" -c "sleep 2" -c "wq" ./ts_grammar.gas
    nvim -c "InspectTree" ./ts_grammar.gas

run:
    {{ TS }} generate
    {{ TS }} build --wasm
    {{ TS }} playground

build:
    {{ TS }} generate
    {{ TS }} build

install: build && clean
    install -d {{ INSTALL_DIR }}/parser {{ INSTALL_DIR }}/queries/gas
    install -m755 *.so {{ INSTALL_DIR }}/parser/
    install -m644 ./queries/*.scm {{ INSTALL_DIR }}/queries/gas/

clean:
    find -name '*.so' -delete
    find -name '*.wasm' -delete
    find -name '*.a' -delete
