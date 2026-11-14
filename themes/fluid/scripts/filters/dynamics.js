/* global hexo */

'use strict';

const path = require('path');
const { url_for } = require('hexo-util');

const DYNAMICS_DIR = 'dynamics/';
const ABSOLUTE_URL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/|\?)/i;
const FENCE_OPEN_RE = /^\s{0,3}(`{3,}|~{3,})/;
const INDENTED_CODE_RE = /^(?: {4,}|\t)/;
const TAG_CODE_OPEN_RE = /\{%\s*(codeblock|code|raw)\b/;
const TAG_CODE_CLOSE_RE = /\{%\s*end(?:codeblock|code|raw)\s*%\}/;
const CODE_BLOCK_OPEN = '<hexoPostRenderCodeBlock>';
const CODE_BLOCK_CLOSE = '</hexoPostRenderCodeBlock>';
const PH_OPEN = '\uE000DYNAMICS_PH_';
const PH_CLOSE = '\uE001';
const PLACEHOLDER_RE = /\uE000DYNAMICS_PH_(\d+)\uE001/g;

const isDynamicSource = (source) => {
  return typeof source === 'string' && source.indexOf(DYNAMICS_DIR) === 0;
};

/**
 * 动态页面的资源路径基准：把 Windows 反斜杠规范化，并去掉文件名 / index.html，
 * 最终得到形如 /dynamics/foo/ 的绝对 URL。
 */
const getBaseUrl = (pagePath) => {
  if (!pagePath) {
    return '';
  }
  let dir = String(pagePath).replace(/\\/g, '/');
  if (/index\.html?$/i.test(dir)) {
    dir = dir.replace(/index\.html?$/i, '');
  } else {
    dir = dir.replace(/[^/]*$/, '');
  }
  if (!dir) {
    return '';
  }
  const url = url_for.call(hexo, dir);
  return url.endsWith('/') ? url : `${url}/`;
};

const rewriteUrl = (url, base) => {
  if (!url || ABSOLUTE_URL_RE.test(url)) {
    return url;
  }
  const joined = `${base}${url.replace(/^\.\//, '')}`.replace(/\\/g, '/');
  return path.posix.normalize(joined);
};

const protect = (matched, protectedParts) => {
  protectedParts.push(matched);
  return `${PH_OPEN}${protectedParts.length - 1}${PH_CLOSE}`;
};

// 单行内的 markdown 链接 / 图片、引用式定义、内嵌 HTML 标签
const rewriteLine = (line, base) => {
  if (!line || (line.indexOf('](') === -1 && line.indexOf('<') === -1
    && !/^\s{0,3}\[[^\]\n]+\]:/.test(line))) {
    return line;
  }

  const protectedParts = [];
  let result = line;

  // 保护行内代码、转义的 markdown 语法和脚注语法，避免误改
  result = result.replace(/(`+)[\s\S]*?\1/g, (match) => protect(match, protectedParts));
  // 转义的链接整体保留；转义的感叹号只保护自身，后面的链接目标仍然可以补全
  result = result.replace(/\\\[[^\]]*\]\([^)]*\)/g, (match) => protect(match, protectedParts));
  result = result.replace(/\\!/g, (match) => protect(match, protectedParts));
  result = result.replace(/\[\^\d+\]\([^)]*\)/g, (match) => protect(match, protectedParts));

  // Markdown 图片与链接：![alt](image.png "title") / [text](file.zip)
  result = result.replace(/(\]\()(<[^>\n]*>|[^)\s]+)/g, (match, prefix, target) => {
    if (target.startsWith('<') && target.endsWith('>')) {
      return `${prefix}<${rewriteUrl(target.slice(1, -1), base)}>`;
    }
    return prefix + rewriteUrl(target, base);
  });

  // 引用式链接定义：[id]: file.png（脚注定义 [^1]: 内容 不处理）
  result = result.replace(/^(\s{0,3}\[(?!\^)[^\]\n]+\]:[ \t]*)(<?)([^\s>]+)(>?)/,
    (match, prefix, open, target, close) => {
      return prefix + open + rewriteUrl(target, base) + close;
    });

  // 正文里直接写的 HTML 标签
  result = result.replace(/(<(?:img|a|video|audio|source)\b[^>]*?\b(?:src|href)=)(["'])(.*?)\2/gi,
    (match, prefix, quote, target) => `${prefix}${quote}${rewriteUrl(target, base)}${quote}`);

  return result.replace(PLACEHOLDER_RE, (match, index) => protectedParts[Number(index)] || '');
};

/**
 * 与文章一致：动态正文里的相对图片 / 附件路径按该动态详情页的地址补全，
 * 这样动态既可以直接引用站内绝对路径（/img/xxx.png），
 * 也可以把图片放在动态自己的目录里用相对路径引用（![](image.png)）。
 *
 * 注意：hexo-renderer-marked 默认会把相对图片地址加上站点根路径（prependRoot），
 * 所以在 markdown 渲染之前先转换成绝对地址；代码块 / 行内代码 / 脚注语法保持原样。
 * 用 priority 9 保证在 Hexo 自带的 backtick_code_block 之前执行，
 * 从而能按原始的 markdown 代码围栏跳过代码块。
 */
hexo.extend.filter.register('before_post_render', function(data) {
  if (!data || !isDynamicSource(data.source) || !data.content) {
    return data;
  }

  const base = getBaseUrl(data.path);
  if (!base) {
    return data;
  }

  let fenceChar = '';
  let fenceLength = 0;
  let inTagCode = false;
  let inIndentedCode = false;
  let inCodeBlock = false;
  let prevBlank = true;

  data.content = data.content.split('\n').map((line) => {
    const isBlank = line.trim() === '';
    let result = line;

    // 兼容其它 filter 已经处理成占位符的代码块（防御性判断）
    if (inCodeBlock) {
      if (line.indexOf(CODE_BLOCK_CLOSE) !== -1) {
        inCodeBlock = false;
      }
    }
    else if (line.indexOf(CODE_BLOCK_OPEN) !== -1) {
      inCodeBlock = true;
    }
    else if (TAG_CODE_OPEN_RE.test(line)) {
      if (!TAG_CODE_CLOSE_RE.test(line)) {
        inTagCode = true;
      }
    }
    else if (inTagCode) {
      if (TAG_CODE_CLOSE_RE.test(line)) {
        inTagCode = false;
      }
    }
    else {
      const fence = FENCE_OPEN_RE.exec(line);
      if (fence) {
        const run = fence[1];
        const char = run.charAt(0);
        if (!fenceChar) {
          fenceChar = char;
          fenceLength = run.length;
        }
        else if (char === fenceChar && run.length >= fenceLength) {
          fenceChar = '';
          fenceLength = 0;
        }
      }
      else if (fenceChar) {
        // 代码围栏内，保持原样
      }
      else {
        const isIndented = INDENTED_CODE_RE.test(line);
        if (inIndentedCode) {
          if (!isBlank && !isIndented) {
            inIndentedCode = false;
          }
        }
        else if (isIndented && prevBlank) {
          // 4 空格 / Tab 缩进的代码块
          inIndentedCode = true;
        }
        if (!inIndentedCode) {
          result = rewriteLine(line, base);
        }
      }
    }

    prevBlank = isBlank;
    return result;
  }).join('\n');

  return data;
}, 9);
