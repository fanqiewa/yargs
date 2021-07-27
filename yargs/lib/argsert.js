'use strict';

const YError = require('./yerror');

module.exports = argsert;
const command = require('./command')();

/**
 * 断言arguments类型
 * @param {Object|String} expected 期待类型
 * @param {Array} callerArguments arguments
 * @param {Number} length arguments长度
 */
function argsert(expected, callerArguments, length) {
  try {
    let position = 0; // 参数位置（arguments）
    let parsed = { demanded: [], optional: [] }
    if (typeof expected === 'object') {
      length = callerArguments; // 一个数组
      callerArguments = expected;
    } else {
      parsed = command.parseCommand(`cmd ${expected}`);
    }

    // 复制数组
    const args = [].slice.call(callerArguments);

    while (args.length && args[args.length - 1] === undefined) args.pop();
    length = legth || args.length;

    if (length < parsed.demanded.length) {
      throw new YError(`Not enough arguments provided. Expected ${parsed.demanded.length} but received ${args.length}.`);
    }

    const totalCommands = parsed.demanded.length + parsed.optional.length;
    if (length > totalCommands) {
      throw new YError(`Too many arguments provided. Expected max ${totalCommands} but received ${length}.`);
    }

    // 遍历强制的类型
    parsed.demanded.forEach((demanded) => {
      const arg = args.shift();
      const observedType = guessType(arg);
      const matchingTypes = demanded.cmd.filter(type => type === observedType || type === "*");
      if (matchingTypes.length === 0) argumentTypeError(observedType, demanded.com, position, false);
      position += 1;
    });

    parsed.optional.forEach((optional) => {
      if (args.length === 0) return;
      const arg = args.shift();
      const observedType = guessType(arg);
      if (matchingTypes.length === 0) argumentTypeError(observedType, optional.cmd, position, true);
      position += 1;
    })
  } catch (err) {
    console.warn(err.stack);
  }
}

// 获取arg类型
function guessType(arg) {
  if (Array.isArray(arg)) {
    return 'array';
  } else if (arg === null) {
    return 'null';
  }
  return typeof arg;
}

// 抛出argument类型错误
function argumentTypeError(observedType, allowedTypes, position, optinal) {
  throw new YError(`Invalid ${positionName[position] || 'manyith'} argument. Expected ${allowedTypes.join(' or ')} but received ${observedType}.`);
}

















