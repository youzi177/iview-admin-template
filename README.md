## Iview-Admin-Template

这是一个基于`Iview-Admin`的升级模板，对依赖进行**有限的升级**，包括升级为view-design，该项目在`node：12.14.0`完美运行（0错误0警告），建议在改版本下运行项目，

对控制台的一些警告错误也进行优化

## 版本要求

```
nvm install 12.14.0
nvm use 12.14.0
```

运行项目

```
git clone https://github.com/youzi177/iview-admin-template.git
npm install 
npm run dev
```

## 主要修改

**安装指定的webpack和Babel和marked**

```
npm install -D webpack@4.46.0 @babel/core@7.10.0 @babel/preset-env@7.10.0 marked@0.3.19
```

说明：

- `simplemde@1.11.2` 的依赖声明是 marked: "*"，所以重新安装依赖时，`npm` 把当前最新的 marked 拉下来了；建议先卸载marked再安装，`npm uninstall marked`
- 某个旧版 friendly-errors 插件尝试访问已经不存在的 `webpack` 内部模块,所以重新安装指定的`webpack` 版本

**升级为`view-design4`，移除`iview`组件库**

- View UI（iView）从 4.0.0 版本开始，需将 `npm` 包 `iview` 替换为 `view-design`。

**增加了`.prettierrc`和配置vscode自动格式化**
