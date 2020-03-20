#sideEffects说明
为false是，默认只打包 export被使用的部分，如果有副作用，则指定 ['...path']

注意，所有导入文件都会受到 tree shaking 的影响。
这意味着，如果在项目中使用类似 css-loader 并 import 一个 CSS 文件，
则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：
```json
{
"sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```
