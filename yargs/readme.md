### API reference

- 为键名设置别名
> .alias(key, alias)

For example
```javascript
const argv = require("yargs").alias("n", "name").argv;
console.log(argv);
```

command
```shell
$ node index.js --n=fanqiewa
```

output
```javascript
{ _: [], n: 'fanqiewa', name: 'fanqiewa', '$0': 'index.js' }
```

----

- 获取参数作为普通的对象，假设没有相应的标志的参数都在 `argv._` 的数组中，脚本名称或者节点命令在argv的$0中可用。
> .argv

For example
```javascript
const argv = require("./yargs").argv;
console.log(argv);
```

command
```shell
$ node index.js -n=fanqiewa m 2
```

output
```javascript
{ _: [ 'm', 2 ], n: 'fanqiewa', '$0': 'index.js' }
```

----

- 告诉解析器将key的value解析为数组
> .array(key)

For example
```javascript
const argv = require("./yargs");
console.log(argv.array('name').argv);
```

command
```shell
$ node index.js --name=fanqiewa yiran
```

output
```javascript
{ _: [], name: [ 'fanqiewa', 'yiran' ], '$0': 'index.js' }
```

----

- 告诉解析器将key的value解析为布尔
> .boolean(key)

For example
```javascript
const argv = require("./yargs");
console.log(argv.boolean('name').argv);
```

command
```shell
$ node index.js --name=true
```

output
```javascript
{ _: [], name: true, '$0': 'index.js' }
```

----

- 添加自定义校验argv
> .check(fn, [global=true])

For example
```javascript
const argv = require("./yargs");
console.log(argv.check((argv, options) => {
	console.log(argv, "----", options);
	const filePath = argv._;
	if (filePath.length > 1) {
		throw new Error("Only 0 or 1 files may be passed.");
	} else {
		return true;
	}
}).argv);
```

command
```shell
$ node index.js --name=fanqiewa
```

output
```javascript
{ _: [], name: 'fanqiewa', '$0': 'index.js' } '----' { help: [], version: [] }
{ _: [], name: 'fanqiewa', '$0': 'index.js' }
```

----

- 将键的有效值限制为预定义的一组选项，以数组或单个值的形式给出
> .choices(key, choices)


For example
```javascript
const argv = require("./yargs");
console.log(argv.choices("name", ["fanqiewa", "yiran"]).argv);
```

command
```shell
$ node index.js --name=yiran
```

output
```javascript
{ _: [], name: 'yiran', '$0': 'index.js' }
```

----

- 通过同步的函数来转换命令行上给出的值
> .coerce(key, fn)


command
```javascript
$ node index.js --file=yargs/yargs.js
```

output
```javascript
{ _: [], file: '文件内容', '$0': 'index.js' }
```

----

- 将目录中的命令模块应用于调用此方法的模块
> .commandDir(directory, [opts]) // TODO

----

- 定义应用程序暴露命令
> .command(cmd, desc, [builder], [handler])
> .command(cmd, desc, [module])
> .command(module) // TODO


----

- 为命令和选项启用bash/zsh-完成快捷方式
> .completion([cmd], [description], [fn]) // TODO

----

- 定义配置项。告诉解析器，如果秘钥指定的选项被传入，它应该被解析为JSON配置文件的路径。文件被加载和解析，其属性被设置为参数。由于文件是使用Node的require()加载的，所以文件名必须以.json结尾才能正确解析。
> .config([key], [description], [parseFn])
> .config(object)

For example(1)
```javascript
const argv = require("./yargs");
const fs = require("fs");
console.log(argv.config('setting', function (configPath) {
	return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}).argv);
```

command
```shell
$ node index.js --setting=config/config.json
```

output
```javascript
{
	_: [],
	settring: 'config/config.json',
	tab: 1,
	head: 2,
	'$0': 'index'
}
```

For example(2)
```javascript
const argv = require("./yargs");
console.log(argv.config({
	foo: 1,
	bar: 2
}).argv);
```

command
```shell
$ node index.js
```

output
```javascript
{ _: [], foo: 1, bar: 2, '$0': 'index.js' }
```

For example(3 /* extends关键字 */）
```javascript
const argv = require("./yargs");
console.log(argv.config({
	foo: 1,
	bar: 2,
	extends: 'config/config.json'
}).argv);
```

command
```shell
$ node index.js
```

output
```javascript
{ _: [], tab: 1, head: 2, foo: 1, bar: 2, '$0': 'index.js' }
```

----

- 定义冲突的键。（即：key1和key2不能同时存在)
> .conflicts(key1, key2)

For example(1)
```javascript
const argv = require("./yargs");
console.log(argv.conflicts('x', 'y').argv);
```

command
```shell
$ node index.js --x=fanqiewa
```

output
```javascript
{ _: [], x: 'fanqiewa', '$0': 'index.js' }
```

command
```shell
$ node index.js --x=fanqiewa --y-yiran
```

output
```javascript
选项：
	--help		 显示帮助信息																																							[布尔]
	--version  显示版本号																																							 [布尔]
选项 x 和 y 是互斥的
```

For example(2)
```javascript
const argv = require("./yargs");
console.log(argv.conflicts('x', ['y', 'z']).argv);
```

command
```shell
$ node index.js --x=fanqiewa --z-yiran
```

output
```javascript
选项：
	--help		 显示帮助信息																																							[布尔]
	--version  显示版本号																																							 [布尔]
选项 x 和 z 是互斥的
```

----

- 将键解析为布尔标志，但将其解析值设置为标志出现的次数，而不是ture或false。因此默认值为0
> .count(key)

For example
```javascript
const argv = require("./yargs");
console.log(argv.count('count').argv);
```

command
```shell
$ node index.js --count --count
```

output
```javascript
{ _: [], count: 2, '$0': 'index.js' }
```

----

- 设置默认值。如果在process.argv中没有指定选项，则将argv[key]配置的默认值设置为值
> .default(key, value, [description])

For example
```javascript
const argv = require("./yargs");
console.log(argv.default('random', function randomValue() {
	return Math.random() * 256;
}).argv);
```

command
```shell
$ node index.js
```

output
```javascript
{ _: [], random: 203.4467186763368, '$0': 'index.js' }
```

----

- 设置必须传入的键
> .demand(count, [max], [msg], [DEPRECATED])

For example1
```javascript
const argv = require("./yargs");
console.log(argv.demand(2, ['run', 'path'], 'Please provide both run and path arguments to work with this tool').argv);
```

command
```shell
$ node index.js --run=serve --path=index.js run path
```

output
```javascript
{
	_: [ 'run', 'path' ],
	run: 'serve',
	path: 'index.js',
	'$0': 'index.js'
}
```

For example2
```javascript
const argv = require("./yargs");
console.log(argv.demand(['run', 'path'], 'Pleass provide both run and path arguments to work with this tool').argv);
```

command
```shell
$ node index.js --run=serve --path=/index.js
```

output
```javascript
{
	_: [],
	run: 'serve',
	path: 'D:/csii/git/Git/index.js',
	'$0': 'index.js'
}
```

For example3
```javascript
const argv = require("./yargs");
console.log(argv.demand('run', 'Please provide both run and path arguments to work with this tool').argv);
```

command
```shell
$ node index.js --run=serve
```

output
```javascript
{ _: [], run: 'serve', '$0': 'index.js' }
```













































































































































































