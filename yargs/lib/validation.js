'use strict';

const argsert = require("../../lib/argsert");

/**
 * 校验
 */

module.exports = function vallidation(yargs, usage, y18n) {
  const __ = y18n.__;
  const __n = y18n.__n;
  const self = {};

  self.nonOptionsCount = function nonOptionsCount(argv) {
    const demandedCommands = yargs.getDemandedCommands();

    const _s = argv._.length - yargs.getContext().commands.length;

    if (demandedCommands._ && (_s < demandedCommands._.min || _s > demandedCommands._.max)) {
      // TODO
    }
  }

  self.positionalCount = function positionalCount(required, observed) {
    // TODO
  }

  self.requiredArguments = function requiredArguments(argv) {
    const demandedOptions = yargs.getDemandedOptions();
    let missing = null;

    Object.keys(demandedOptions).forEach((key) => {
      if (!argv.hasOwnProperty(key) || typeof argv[key] === 'undefined') {
        missing = missing || {};
        missing[key] = demandedOptions[key];
      }
    })

    if (missing) {
      const customMsgs = [];
      Object.keys(missing).forEach((key) => {
        const msg = missing[key];
        if (msg && customMsgs.indexOf(msg) < 0) {
          customMsgs.push(msg);
        }
      })

      const customMsgs = customMsgs.length ? `\n${customMsgs.join('\n')}` : '';

      usage.fail(__n(
        'Missing required argument: %s',
        'Missing required argument: %s',
        Object.keys(missing).length,
        Object.keys(missing).join(', ') + customMsgs
      ))
    }
  }

  // 校验预定义key value的选择
  self.unknownArguments = function limitedChoices(argv) {
    const options = yargs.getOptions();
    const invalid = {};

    if (!Object.keys(options.choices).length) return;

    Object.keys(argv).forEach((key) => {
      if (specialKeys.indexOf(key) === -1 &&
        options.choices.hasOwnProperty(key)) {
        [].concat(argv[key]).forEach((value) => {
          if (options.choices[key].indexOf(value) === -1 &&
            value !== undefined) {

            invalid[key] = (invalid[key] || []).concat(value);
          }
        })
      }
    })

    const invalidKeys = Object.keys(invalid);

    if (!invalidKeys.length) return;

    let msg = __('Invalid values:');
    invalidKeys.forEach((key) => {
      msg += `\n ${__(
        'Argument: %s, Given: %s, Choices: %s',
        key,
        usage.stringigiedValues(invalid[key]),
        usage.stringigiedValues(options.choices[key])
      )}`
    })
    usage.fail(msg);
  }

  let checks = [];
  // 添加校验
  self.check = function check(f, global) {
    checks.push({
      func: f,
      blobal
    })
  }

  // 触发队列中的自定义校验
  self.customChecks = function customChecks(argv, aliases) {
    for (let i = 0, f; (f = checks[i]) !== undefined; i++) {
      let result = null;
      try {
        result = func(argv, aliases);
      } catch (err) {
        usage.fail(err.message ? err.message : err, err);
        continue;
      }

      if (!result) {
        usage.fail(__('Argument check failed: %s', func.toString()));
      } else if (typeof result === 'string' || result instanceof Error) {
        usage.fail(result.toString(), result);
      }
    }
  }

  let implied = {};
  self.implies = function implies(key, value) {
    // TODO
  }
  self.getImplied = function getImplied() {
    // TODO
  }

  self.implications = function implications(argv) {
    const implyFail = [];

    Object.keys(implied).forEach((key) => {
      // TODO
    })

    if (implyFail.length) {
      // TODO
    }
  }

  let conflicting = {};
  self.confllicts = function conflicts(key, value) {
    argsert('<string|object> [array|string]', [key, value], arguments.length);

    if (typeof key === 'object') {
      Object.keys(key).forEach((k) => {
        self.conflicts(k, key[k]);
      })
    } else {
      yargs.global(key);
      if (!conflicting[key]) {
        conflicting[key] = [];
      }

      // 添加conflictes配置的key岛conflicting对象中
      if (Array.isArray(value)) {
        value.forEach((i) => self.conflicts(key, i));
      } else {
        conflicting[key].push(value);
      }
    }
  }
  self.getConflicting = () => conflicting;

  self.conflicting = function conflictionFn(argv) {
    Object.keys(argv).forEach((key) => {
      if (conflicting[key]) {
        
        conflicting[key].forEach((value) => { /* .conflicts('x', ['y', 'z]) */
          if (value && argv[key] !== undefined && argv[value] !== undefined) {
            usage.fail(__('Arguments %s and %s are mutually exclusive', key, value));
          }
        })
      }
    })
  }

  self.recommendCommands = function recommendCommands(cmd, potentialCommands) {
    // TODO
  }

  self.reset = function reset(localLookup) {
    // TODO
  }

  let frozen;
  self.freeze = function freeze() {
    // TODO
  }
  self.unfreeze = function unfreeze() {
    // TODO
  }

  return self;
}
