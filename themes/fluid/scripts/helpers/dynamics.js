/* global hexo */

'use strict';

// 已经是绝对地址 / 协议地址 / 锚点 / 查询参数，不需要补全
const ABSOLUTE_URL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/|\?)/i;

const rewriteUrl = (value, base) => {
  if (typeof value !== 'string' || !value || ABSOLUTE_URL_RE.test(value)) {
    return value;
  }
  return base + value.replace(/^\.\//, '');
};

/**
 * 动态列表页会复用多个页面的正文，正文中的相对资源地址会以列表页为基准而失效，
 * 这里把它们统一改写为相对于该动态详情页的绝对路径。
 */
hexo.extend.helper.register('dynamics_content', function(content, page) {
  if (!content || !page || !page.path) {
    return content || '';
  }

  const pageUrl = this.url_for(page.path);
  const base = pageUrl.substring(0, pageUrl.lastIndexOf('/') + 1);
  if (!base) {
    return content;
  }

  return content
    .replace(/(<img\b[^>]*?\bsrc=")([^"]*)(")/gi,
      (match, prefix, value, suffix) => prefix + rewriteUrl(value, base) + suffix)
    .replace(/(<(?:video|audio|source)\b[^>]*?\bsrc=")([^"]*)(")/gi,
      (match, prefix, value, suffix) => prefix + rewriteUrl(value, base) + suffix)
    .replace(/(<a\b[^>]*?\bhref=")([^"]*)(")/gi,
      (match, prefix, value, suffix) => prefix + rewriteUrl(value, base) + suffix);
});
