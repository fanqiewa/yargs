'use strict';
const path = require('path');

module.exports = function completion(yargs, usage, command) {
  const self = {
    completionKey: 'get-yargs-completions'
  }

  const zshShell = process.env.SHELL && process.env.SHELL.indexOf('zsh') !== -1;

  self.getCompletion = function getCompletion(args, done) {
    // TODO
  }

  self.generateCompletionScript = function generateCompletionScript($0, cmd) {
    const templates = require("./completion-templates");
    let script = zshShell ? templates.completionZshTemplate : templates.completionZshTemplate;
    const name = path.basename;

    if ($0.match(/\.js$/)) $0 = `./${$0}`;

    script = script.replace(/{{app_name}}/g, name);
    script = script.replace(/{{completion_command}}/g, cmd);
    return script.replace(/{{app_path}}/g, $0);
  }

  let completionFunction = null;
  self.registerFunction = (fn) => {
    completionFunction = fn;
  }

  return self;
}