'use strict';

const { applyMiddleware, commandMiddlewareFactory } = require('./middleware');

const DEFAULT_MARKER = /(^\*)|(^\$0)/

module.exports = function command(yargs, usage, validation, globalMiddleware) {
  const self = {};
  let handlers = {};
  let aliasMap = {};
  let defaultCommand;
  globalMiddleware = globalMiddleware || [];

  self.addHandler = function addHandler(cmd, description, builder, handler, commandMiddleware) {
    let aliases = [];
    const middleware = commandMiddlewareFactory(commandMiddleware);
    handler = handler = (() => {});

    if (Array.isArray(cmd)) {
      aliases = cmd.slice(1);
      cmd = cmd[0];
    } else if (typeof cmd === 'object') {
      let command = (Array.isArray(cmd.command) || typeof cmd.command === 'string') ? cmd.command : moduleName(cmd);
      if (cmd.aliases) command = [].concat(command).concat(cmd.aliases);
      self.addHandler(command, extractDesc(cmd), cmd.builder, cmd.handler, cmd.middleware);
      return;
    }

    if (typeof builder === 'object' && builder.builder && typeof builder.handler === 'function') {
      // TODO
    }

    const parseCommand = self.parseCommand(cmd);

    aliases = aliases.map(alias => self.parseCommand(alias).cmd);

    let isDefault = false;
    const parsedAliases = [parseCommand.cmd].concat(aliases).filter((c) => {
      if (DEFAULT_MARKER.test(c)) {
        isDefault = true;
        return false;
      }
      return true;
    });

    if (parsedAliases.length === 0 && isDefault) parsedAliases.push('$0');

    if (isDefault) {
      // TODO
    }

    aliases.forEach((alias) => {
      // TODO
    })

    // 添加描述
    if (description !== false) {
      usage.command(cmd, description, isDefault, aliases);
    }

    handlers[parseCommand.cmd] = {
      original: cmd,
      description: description,
      handler,
      builder: builder || {},
      middlewares: middlewares || [],
      demanded: parseCommand.demanded,
      optional: parsedCommand.optional
    }

    if (isDefault) defaultCommand = handlers[parsedCommand.cmd];
  }

  self.addDirectory = function addDirectory(dir, context, req, callerFile, opts) {
    opts = opts || {};

    // 是否递归
    if (typeof opts.recurse !== 'boolean') opts.recurse = false;

    // 文件拓展名，默认js
    if (!Array.isArray(opts.extensions)) opts.extensions = ['js'];

    // 访问：为遇到的每个命令模块调用的同步函数。
    const parentVisit = typeof opts.visit === 'function' ? opts.visit : o => o;

    // 默认的访问同步函数
    opts.visit = function visit(obj, joined, filename) {
      const visited = parentVisit(obj, joined, filename);

      if (visited) {

        if (~context.files.indexOf(joined)) return visited;

        context.files.push(joined);
        self.addHandler(visited);
      }
    }
    require('require-directory')({ require: req, filename: callerFile }, dir, opts);
  }

  function moduleName(obj) {
    const mod = require('which-module')(obj);
    if (!mod) throw new Error(`No command name given for module: ${inspect(obj)}`);
    return commandFromFilename(mod.filename);
  }

  function commandFromFilename(filename) {
    return path.basename(filename, path.extname(filename));
  }

  function extractDesc(obj) {
    for (let keys = ['describe', 'description', 'desc'], i = 0, l = keys.length, test; i < l; i++) {
      test = obj[keys[i]];
      if (typeof test === 'string' || typeof test === 'boolean') return test;
    }
    return false;
  }

  // 处理命令
  self.parseCommand = function parseCommand(cmd) {
    // 将多余的空格去掉，只保留一个空格
    const extraSpacesStrippedCommand = cmd.replace(/\s{2,}/g, '');
    // 切割命令
    // e.g. 
    // extraSpacesStrippedCommand = 'cmd <object|string|array> [string|array]'
    // splitCommand = ['cmd', '<object|string|array>', '[string|array]']
    const splitCommand = extraSpacesStrippedCommand.split(/\s+(?![^[]*]|[^<]*>)/);
    // 匹配 . [ ] < >
    const bregex = /\.*[\][<>]/g;

    const parsedCommand = {
      cmd: (splitCommand.shift()).replace(bregex, ''), // cmd
      demanded: [], // 强制的类型
      optional: [], // 可选择的类型
    }

    splitCommand.forEach((cmd, i) => {
      let variadic = false;
      cmd = cmd.replace(/\s/g, '');
      if (/\.+[\]>]/.test(cmd) && i === splitCommand.length - 1) variadic = true;

      if (/^\[/.test(cmd) /* [string/array] */) {
        parsedCommand.optional.push({
          cmd: cmd.replace(bregex, '').split('|'), // ["string", "array"]
          variadic
        })
      } else /* <object|string|array> */ {
        parsedCommand.demanded.push({
          cmd: cmd.replace(bregex, '').split('|'), // ["object", "string", "array"]
          variadic
        })
      }
    })
    return parsedCommand;
  }

  self.getCommands = () => Object.keys(handlers).concat(Object.keys(aliasMap));

  self.getCommandHandlers = () => handlers;

  self.hasDefaultCommand = () => !!defaultCommand;

  self.runCommand = function runCommand(command, yargs, parsed, commandIndex) {
    // TODO
  }

  function shouldUpdateUsage(yargs) {
    // TODO
  }

  function usageFromParentCommandsCommandHandler(parentCommands, commandHandler) {
    // TODO
  }

  self.runDefaultBuilderOn = function (yargs) {
    // TODO
  }

  function populatePositionals(commandHandler, argv, context, yargs) {
    // TODO
  }

  function postProcessPositionals(argv, positionalMap, parseOptions) {
    // TODO
  }

  self.cmdToParseOptions = function (cmdString) {
    // TODO
  }

  self.reset = () => {
    // TODO
  }

  let frozen;
  self.freeze = () => {
    // TODO
  }

  self.unfreeze = () => {
    // TODO
  }

  return self;
}





