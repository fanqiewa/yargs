'use strict';
const fs = require('fs');
const path = require('path');
const YError = require('./yerror');

let previouslyVisitedConfigs = [];

// 检查是否有重复的path
function checkForCircularExtends(cfgPath) {
  if (previouslyVisitedConfigs.indexOf(cfgPath) > -1) {
    throw new YError(`Circular extended configurations: '${cfgPath}'.`);
  }
}

function getPathToDefaultConfig(cwd, pathToExtend) {
  return path.resolve(cwd, pathToExtend);
}

function applyExtends(config, cwd) {
  let defaultConfig = {};

  if (config.hasOwnProperty('extends') /* 如果包含了extends关键字 */) {
    if (typeof config.extends !== 'string') return defaultConfig;
    const isPath = /\.json|\..*rc$/.test(config.extends);
    let pathToDefault = null;
    if (!isPath) {
      try {
        pathToDefault = require.resolve(config.extends);
      } catch (err) {

      }
    } else {
      pathToDefault = getPathToDefaultConfig(cwd, config.extends);
    }

    if (!pathToDefault && !isPath) return config;

    checkForCircularExtends(pathToDefault);

    previouslyVisitedConfigs.push(pathToDefault);

    defaultConfig = isPath ? JSON.parse(fs.readFileSync(pathToDefault, 'utf8')) : require(config.extends);
    delete config.extends;
    // 递归json里面的extends属性
    defaultConfig = applyExtends(defaultConfig, path.dirname(pathToDefault));
  }

  previouslyVisitedConfigs = [];
  
  return Object.assign({}, defaultConfig, config);
}