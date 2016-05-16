
fis3-deploy-dfy-zip
==========================


大房鸭fis3扩展插件。

## 安装插件

全局安装

```bash
npm install -g fis3-deploy-dfy-zip
```

或者本地安装到项目所在目录。

```bash
npm install fis3-deploy-dfy-zip
```

## 配置

```javascript
fis.match('**', {
  deploy: [
    fis.plugin('dfy-zip'),

    fis.plugin('local-deliver', {
      to: './output'
    })
  ]
})

```

## 配置说明

* `filename` 默认为 `dfy-all.zip` 用来配置打包的文件名。

