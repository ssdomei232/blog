/* global hexo */

'use strict';

const pagination = require('hexo-pagination');

const DYNAMICS_DIR = 'dynamics';
const DEFAULT_PER_PAGE = 10;

/**
 * 动态文件统一存放在 source/dynamics/ 目录下，和文章一样是 Markdown + Front-matter。
 * 支持扁平文件（source/dynamics/foo.md）和文件夹形式（source/dynamics/foo/index.md）。
 * 该目录下的所有 page 都会被识别为动态，列表页由本 generator 生成。
 */
const isDynamicPage = (page) => {
  return page
    && typeof page.source === 'string'
    && page.source.indexOf(`${DYNAMICS_DIR}/`) === 0
    && page.source !== `${DYNAMICS_DIR}/index.md`;
};

const compareNotes = (a, b) => {
  // top: true 置顶，其余按时间倒序
  const topA = a.top === true ? 1 : 0;
  const topB = b.top === true ? 1 : 0;
  if (topA !== topB) {
    return topB - topA;
  }
  const dateA = a.date ? new Date(a.date).getTime() : 0;
  const dateB = b.date ? new Date(b.date).getTime() : 0;
  return dateB - dateA;
};

const normalizeBase = (path) => {
  let base = typeof path === 'string' ? path.trim() : '';
  base = base.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!base) {
    base = DYNAMICS_DIR;
  }
  return `${base}/`;
};

// 给 source/dynamics/ 下的页面套用动态详情页布局
const originalPageGenerator = hexo.extend.generator.get('page');

if (originalPageGenerator) {
  hexo.extend.generator.register('page', function(locals) {
    return Promise.resolve(originalPageGenerator.call(this, locals)).then((routes) => {
      if (!Array.isArray(routes)) {
        return routes;
      }
      return routes.map((route) => {
        if (route && route.layout && isDynamicPage(route.data)) {
          const layouts = Array.isArray(route.layout) ? route.layout.slice() : [route.layout];
          if (layouts[0] !== 'dynamics-note') {
            layouts.unshift('dynamics-note');
          }
          route.layout = layouts;
        }
        return route;
      });
    });
  });
}

hexo.extend.generator.register('_dynamics', function(locals) {
  const config = this.theme.config.dynamics || {};
  if (config.enable === false) {
    return;
  }

  const allPages = typeof locals.pages.toArray === 'function' ? locals.pages.toArray() : [];

  if (allPages.some((page) => page.source === `${DYNAMICS_DIR}/index.md`)) {
    this.log.warn(
      '[Fluid] 检测到 source/dynamics/index.md，动态列表页由主题自动生成，请删除该文件，' +
      '否则会与自动生成的 /dynamics/ 页面冲突'
    );
    return;
  }

  const notes = allPages.filter(isDynamicPage).sort(compareNotes);
  const base = normalizeBase(config.path);
  const paginationDir = this.config.pagination_dir || 'page';

  let perPage = Number.parseInt(config.per_page, 10);
  if (Number.isNaN(perPage)) {
    perPage = DEFAULT_PER_PAGE;
  } else if (perPage < 0) {
    this.log.warn('[Fluid] dynamics.per_page 不能为负数，已回退为 %d', DEFAULT_PER_PAGE);
    perPage = DEFAULT_PER_PAGE;
  }

  const data = {
    dynamics_total: notes.length
  };

  if (!notes.length) {
    return [{
      path: base,
      layout: 'dynamics',
      data: Object.assign({
        posts: [],
        base,
        total: 1,
        current: 1,
        prev: 0,
        prev_link: '',
        next: 0,
        next_link: ''
      }, data)
    }];
  }

  return pagination(base, notes, {
    perPage,
    layout: 'dynamics',
    format: `${paginationDir}/%d/`,
    data
  });
});
