# pages-boilerplate

## 文件目录结构

```
└── my-awesome-pages ································· project root
   ├─ public ········································· static folder
   │  └─ favicon.ico ································· static file (unprocessed)
   ├─ src ············································ source folder
   │  ├─ assets ······································ assets folder
   │  │  ├─ fonts ···································· fonts folder
   │  │  │  └─ pages.ttf ····························· font file (imagemin)
   │  │  ├─ images ··································· images folder
   │  │  │  └─ logo.png ······························ image file (imagemin)
   │  │  ├─ scripts ·································· scripts folder
   │  │  │  └─ main.js ······························· script file (babel / uglify)
   │  │  └─ styles ··································· styles folder
   │  │     ├─ _variables.scss ······················· partial sass file (dont output)
   │  │     └─ main.scss ····························· entry scss file (scss / postcss)
   │  ├─ layouts ····································· layouts folder
   │  │  └─ basic.html ······························· layout file (dont output)
   │  ├─ partials ···································· partials folder
   │  │  └─ header.html ······························ partial file (dont output)
   │  ├─ about.html ·································· page file (use layout & partials)
   │  └─ index.html ·································· page file (use layout & partials)
   ├─ .gitignore ····································· git ignore file
   ├─ README.md ······································ repo readme
   ├─ gulpfile.js ···································· gulp tasks file
   ├─ package.json ··································· package file
   └─ yarn.lock ······································ yarn lock file
```

## 使用方式

安装: yarn install 
清除: yarn clean
开发: yarn dev
构建: yarn build