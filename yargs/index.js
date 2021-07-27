'use strict'

const Argv = require('..');
const yargs = require('./yargs');

// 属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。
// 第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，则参见 process.argv0。 
// 第二个元素是正被执行的 JavaScript 文件的路径。 其余的元素是任何额外的命令行参数。
/*
  e.g:
  [
    'C:\\Program Files\\nodejs\\node.exe',
    'H:\\-----------------------------\\webpack\\yargs\\myYargs\\index.js'
  ]
*/
Argv(process.argv.slice(2))

function Argv(processArgs, cwd) {
  const argv = yargs(processArgs, cwd, require);
  singletonify(argv);
  return argv;
}

function singletonify(inst) {
  Object.keys(inst).forEach((key) => {
    if (key === 'argv') {
      Argv.__defineGetter__(key, inst.__lookupGetter__(key));
    } else {
      Argv[key] = typeof inst[key] === 'function' ? inst[key].bind(inst) : inst[key];
    }
  })
}