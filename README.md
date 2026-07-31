# 民谣食肆 · 点歌菜单

平板点歌菜单应用

## 部署到 Cloudflare

### 方案一: Cloudflare Pages(推荐)

适合纯静态部署,免费且简单。

#### 部署步骤:

1. **通过 Git 部署**(推荐):
   ```bash
   # 初始化 Git 仓库(如果还没有)
   git init
   git add .
   git commit -m "Initial commit"
   
   # 推送到 GitHub/GitLab
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
   
   然后在 Cloudflare Dashboard 中:
   - 进入 Pages → 创建项目
   - 连接 Git 仓库
   - 构建设置保持默认(无需构建)
   - 点击部署

2. **直接上传部署**:
   ```bash
   # 安装 Wrangler CLI
   npm install -g wrangler
   
   # 登录 Cloudflare
   wrangler login
   
   # 部署到 Pages
   wrangler pages deploy . --project-name=gedan
   ```

部署完成后会获得一个 `.pages.dev` 域名。

---

### 方案二: Cloudflare Workers

如果你需要后端功能(如保存歌单数据),可以使用 Workers。

#### 部署步骤:

```bash
# 部署 Worker
wrangler deploy
```

Workers 方案的优势:
- 可以添加 API 功能
- 支持动态路由
- 可以连接数据库(KV、D1等)

---

## 项目结构

```
gedan/
├── index.html          # 主应用文件
├── _worker.js          # Workers 入口文件(可选)
├── wrangler.toml       # Cloudflare 配置
└── README.md           # 本文档
```

## 本地预览

```bash
# 方式一: 直接打开浏览器
# 直接打开 index.html 文件

# 方式二: 使用本地服务器
npx serve .
# 或
python -m http.server 8000
```

## 自定义域名

在 Cloudflare Pages/Workers 设置中可以绑定自定义域名。

---

**推荐**: 直接使用 **Cloudflare Pages** 部署,简单快速且完全免费。