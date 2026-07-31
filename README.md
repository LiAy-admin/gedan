# 民谣食肆 · 点歌菜单

平板点歌菜单应用

## 部署到 Cloudflare

### 🎯 推荐方案: Cloudflare Pages(纯静态部署)

这是**最简单**的方式,无需任何配置文件,直接部署静态 HTML。

#### 方法一: 通过 Git 自动部署

1. 将代码推送到 GitHub
2. 在 Cloudflare Dashboard 中:
   - 进入 **Pages** → 创建项目
   - 连接 Git 仓库 `https://github.com/LiAy-admin/gedan`
   - **构建配置留空**(无需构建命令)
   - 输出目录: `/`
   - 点击部署

3. 每次推送代码会自动重新部署

#### 方法二: 直接上传

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录
wrangler login

# 部署
wrangler pages deploy . --project-name=gedan
```

---

### 📦 备选方案: Cloudflare Workers(需要后端功能)

如果需要后端 API、数据库等功能,可以使用 Workers。

#### 前置要求

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 部署
npm run deploy
```

#### 添加的功能示例

Workers 可以提供:
- 保存点歌记录到 KV 存储
- API 端点
- 动态路由
- 数据库连接(D1)

---

## 项目结构

```
gedan/
├── index.html          # 主应用文件(静态部署只需要这个)
├── _worker.js          # Workers 入口(可选)
├── package.json        # Node 依赖(Workers 需要)
├── wrangler.toml       # Cloudflare 配置(Workers 需要)
└── README.md           # 本文档
```

---

## 快速开始

### 本地预览

```bash
# 方式一: 直接打开浏览器
# 双击打开 index.html 文件

# 方式二: 本地服务器
npx serve .
# 或
python -m http.server 8000
```

---

## 自定义域名

部署后在 Cloudflare Pages/Workers 设置中绑定自定义域名。

---

**💡 建议**: 如果只需要静态展示,直接用 **Cloudflare Pages** 部署,删除 `_worker.js`、`wrangler.toml`、`package.json` 这些文件即可。