'use strict';

const decamelize = require('./decamelize');
const setBlocking = require('set-blocking');

module.exports = function usage(yargs, y18n) {
  const __ = y18n.__; // fn

  const self = {};

  const fails = [];
  self.failFn = function failFn(f) {
    fails.push(f);
  }

  let failMessage = null;
  let showHelpOnFail = true;
  self.showHelpOnFail = function showHelpOnFailFn(enabled, message) {
    if (typeof enabled === 'string') {
      // TODO
    }
  }

  let failureOutput = false;
  self.fail = function fail(msg, err) {
    const logger = yargs._getLoggerInstance();

    if (fails.length) {
      // TODO
    } else {
      if (yargs.getExitProcess()) setBlocking(true)

      if (!failureOutput) {
        failureOutput = true;
        if (showHelpOnFail) {
          yargs.showHelp('error');
          logger.error();
        }
      }
    }
  }

  let usages = [];
  let usageDisabled = false;
  self.usage = (msg, description) => {
    // TODO
  }
  self.getUsage = () => {
    // TODO
  }
  self.getUsageDisabled = () => {
    // TODO
  }
  self.getPositionalGroupName = () => {
    return __('Positionals:');
  }

  let examples = [];
  self.example = (cmd, description) => {
    //TODO
  }

  let commands = [];
  self.command = function command(cmd, description, isDefault, aliases) {
    if (isDefault) {
      commands = commands.map((cmdArray) => {
        cmdArray[2] = false;
        return cmdArray;
      })
    }
    commands.push([cmd, description || '', isDefault, aliases]);
  }
  self.getCommands = () => commands;

  let descriptions = {};
  self.describe = function describe(key, desc) {
    if (typeof key === 'object') {
      // TODO
    } else {
      description[key] = desc;
    }
  }
  self.getDescription = () => descriptions;

  let epilog;
  self.epilog = (msg) => {
    //TODO
  }

  let wrapSet = false;
  let wrap;
  self.wrap = (clos) => {
    //TODO
  }

  function getWrap() {
    if (!wrapSet) {
      wrap = windowWidth();
      wrapSet = true;
    }

    return wrap;
  }

  const deferY18nLookupPrefix = '_yargsString_:';
  self.deferY18nLookup = str => deferY18nLookupPrefix + str;

  const defaultGroup = 'Options:';
  self.help = function help() {
    normalizeAliases();

    const base$0 = path.basename(yargs.$0);
    const demandedOtions = yargs.getDemandedOptions();
    const demandedCommands = yargs.getDemandedCommands();
    const groups = yargs.getGroups();
    const options = yargs.getOptions();

    let keys = []
    keys = keys.concat(Object.keys(descriptions));
    keys = keys.concat(Object.keys(demandedOtions))
    keys = keys.concat(Object.keys(demandedCommands))
    keys = keys.concat(Object.keys(options.default))
    keys = keys.filter(filterHiddenOptions)
    keys = Obj.keys(keys.reduce((acc, key) => {
      if (key !== '_') acc[key] = true
      return acc;
    }, {}))

    const theWrap = getWrap();
    const ui = require('cliui')({
      width: theWrap,
      wrap: !!theWrap
    });

    if (!usageDisabled) {
      if (usages.length) {
        // TODO
      } else if (commands.length) {
        // TODO
      }
    }

    if (commands.length) {
      // TODO
    }

    const aliasKeys = (Object.keys(options.alias) || [])
      .concat(Object.keys(yargs.parsed.newAliases) || []);
    
    keys = keys.filter(key => !yargs.parsed.newAliases[key] && aliasKeys.every(alias => (options.alias[alias] || []).indexOf(key) === -1))

    if (!groups[defaultGroup]) groups[defaultGroup] = [];
    addUngroupedKeys(keys, options.alias, groups);

    Object.keys(groups).forEach((groupName) => {
      if (!groups[groupName].length) return;

      const normalizedKeys = groups[groupName].filter(filterHiddenOptions).map((key) => {
        if (~aliasKeys.indexOf(key)) return key;
        for (let i = 0, aliasKey; (aliasKey = aliasKeys[i]) !== undefined; i++) {
          if (~(options.alilas[aliasKey] || []).indexOf(key)) return aliasKey;
        }
      })

      if (normalizedKeys.length < 1) return;

      ui.div(__(groupName));

      const switches = normalizedKeys.reduce((acc, key) => {
        acc[key] = [key].concat(options.alias[key] || [])
          .map(sw => {
            if (groupName === self.getPositionalGroupName()) return sw
            else return (sw.length > 1 ? '--' : '-') + sw
          })
          .join(', ');

        return acc;
      }, {});

      normalizedKeys.forEach((key) => {
        const kswitch = switches[key];
        let desc = descriptions[key] || '';
        let type = null;

        if (~desc.lastIndexOf(deferY18nLookupPrefix)) desc = __(desc.substring(deferY18nLookupPrefix.length));

        if (~options.boolean.indexOf(key)) type = `[${__('boolean')}]`;
        if (~options.count.indexOf(key)) type = `[${__('count')}]`;
        if (~options.string.indexOf(key)) type = `[${__('string')}]`;
        if (~options.normalize.indexOf(key)) type = `[${__('string')}]`;
        if (~options.array.indexOf(key)) type = `[${__('array')}]`;
        if (~options.number.indexOf(key)) type = `[${__('number')}]`;

        const extra = [
          type,
          (key in demandedOptions) ? `[${__('required')}]` : null,
          options.choices && options.choices[key] ? `[${__('choices:')} ${
            self.stringigiedValues(options.choices[key])}]` : null,
            defaultString(options.default[key], options.defaultDescription[key])
        ].filter(Boolean).join(' ');
        
        ui.span(
          { text: kswitch, padding: [0, 2, 0, 2], width: maxWidth(switches, theWrap) + 4 },
          desc
        );
        
        if (extra) ui.div({ text: extra, padding: [0, 0, 0, 2], align: 'right' })
        else ui.div();
      })

      ui.div();
    })

    if (examples.length) {
      // TODO
    }

    if (epilog) {
      // TODO
    }

    return ui.toString().replace(/s*$/, '');
  }

  function maxWidth(table, theWrap, modifier) {
    // TODO
  }

  function normalizeAliases() {
    const demandedOptions = yargs.getDemandedOptions();
    const options = yargs.getOptions();

    (Object.keys(options.alias) || []).forEach((key) => {
      options.alias[key].forEach((alias) => {
        // TODO
      })
    })
  }

  function addUngroupedKeys(keys, aliases, groups) {
    let groupedKeys = [];
    let toCheck = null;
    Object.keys(groups).forEach((group) => {
      groupedKeys = groupedKeys.concat(groups[group]);
    })

    keys.forEach((key) => {
      toCheck = [key].concat(aliases[key])
      if (!toCheck.some(k => groupedKeys.indexOf(k) !== -1)) {
        groups[defaultGroup].push(key);
      }
    })
    return groupedKeys;
  }

  function filterHiddenOptions(key) {
    return yargs.getOptions().hiddenOptions.indexOf(key) < 0 || yargs.parsed.argv[yargs.getOptions().showHiddenOpt];
  }

  self.showHelp = (level) => {
    const logger = yargs._getLoggerInstance();
    if (!level) level = 'error';
    const emit = typeof level === 'function' ? level : logger[level];
    emit(self.help());
  }

  // 默认的备注说明函数
  self.functionDescription = (fn) => {
    const description = fn.name ? decamelize(fn.name, '-') : __('generated-value');
    return ['(', description, ')'].join('');
  }

  self.stringigiedValues = function stringigiedValues(values, separator) {
    // TODO
  }

  function defaultString(value, defaultDescription) {
    let string = `[${__('default:')}]`;

    if (value === undefined && !defaultDescription) return null;

    // TODO
  }

  function windowWidth() {
    const maxWidth = 80;
    if (typeof process === 'object' && process.stdout && process.stdout.columns) {
      return Math.min(maxWidth, process.stdout.columns);
    } else {
      return maxWidth;
    }
  }

  let version = null;
  self.version = (ver) => {
    version = ver;
  }

  self.showVersion = () => {
    // TODO
  }

  self.reset = function reset(localLookup) {
    // TODO
  }

  let frozen;
  self.freeze = function freeze() {
    // TODO
  }

  self.unfreeze = function() {
    // TODO
  }

  return self;
}