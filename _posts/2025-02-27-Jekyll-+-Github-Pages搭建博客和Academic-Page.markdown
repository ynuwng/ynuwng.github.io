---
title: "Jekyll + GitHub Pages搭建博客和Academic Page"
date: 2023-05-28
categories: [Tech Notes]
tags: [jekyll, gitHub pages, ruby, blog]
---

## Three Reference Websites

* [Automated Deployment - Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/docs/deployment/automated/)
* [About GitHub Pages and Jekyll - GitHub Docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
* [The fastest and easiest way to install Ruby on a Mac in 2023](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/#configure-your-shell)

## 解决Mac上的Ruby权限问题

Jekyll是基于Ruby的，所以需要先安装Ruby，不能使用Mac自带的Ruby，否则在通过 `gem install jekyll` 时可能会遇到无法访问相应文件夹的问题。常见错误如下：

```sh
ERROR: While executing gem ... (Gem::FilePermissionError)   
You don't have write permissions for the /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/gems/2.6.0 directory.
```

### 解决方法：

1. **更新Homebrew**
   ```sh
   brew update && brew doctor
   ```
   按照 `brew doctor` 提供的提示进行更新，确保你的Xcode已经升级到**14.2及以上**，因为Command Line Tool包含一些关键更新，否则可能无法解决该问题。

2. **安装和配置Ruby**
   按照[这篇文章](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/#configure-your-shell)的 `step by step` 操作指南，成功更换Ruby版本，并正确安装Jekyll。

### 安装Jekyll

```sh
# 安装 Jekyll 和 Bundler
gem install jekyll bundler

# 创建 Jekyll 项目
jekyll new my_blog

# 进入项目目录
cd my_blog

# 运行本地服务器
bundle exec jekyll serve
```

访问 `http://localhost:4000/`，如果能正常打开，则说明Jekyll安装成功。

### 部署到GitHub Pages

1. 在GitHub上创建一个新的仓库，命名为 `your_username.github.io`
2. 在本地Jekyll项目目录中，初始化Git仓库并推送到GitHub：

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your_username/your_username.github.io.git
git push -u origin main
```

3. 启用GitHub Pages，在GitHub仓库的 `Settings > Pages` 中，选择 `main` 分支并保存。
4. 访问 `https://your_username.github.io/`，如果一切配置正确，你的Jekyll博客应该已经成功上线！
