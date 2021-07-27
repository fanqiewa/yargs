'use strict';

module.exports = {

  commandMiddlewareFactory,
  globalMiddlewareFactory
}

function globalMiddlewareFactory(globalMiddleware, context) {
  return function (callback, applyBeforeValidation = false) {
    // TODO
  }
}

function commandMiddlewareFactory(commandMiddleware) {
  if (!commandMiddleware) return [];
  // TODO
}