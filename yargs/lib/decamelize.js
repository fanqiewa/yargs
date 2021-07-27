'use strict';

module.exports = (text, sparator) => {
  separator = typeof separator === 'undefined' ? '_' : separator;

  // e.g. 
  // randomValue => random-value
  return text
    .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)(A-Z][a-z\d]+)/g, `$1${separator}$2`)
    .toLowerCase();
}