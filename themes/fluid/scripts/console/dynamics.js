/* global hexo */

'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { slugize } = require('hexo-util');

/**
 * 新建一条动态
 * 用法：hexo dynamics "今天的晚霞" [--slug custom-slug]
 * 生成：source/dynamics/<slug>/index.md，该目录同时用于放置配图等资源
 */
hexo.extend.console.register('dynamics', '新建一条动态（source/dynamics/）', {
  arguments: [
    { name: 'title', desc: '动态标题，可以省略' }
  ],
  options: [
    { name: 'slug', desc: '自定义文件/目录名' }
  ]
}, function(args) {
  const title = (args._ || []).join(' ').replace(/[\r\n]+/g, ' ').trim();
  const now = moment();
  const timestamp = now.format('YYYYMMDD-HHmmss');

  let slug = path.basename(String(args.slug || ''));
  if (!slug && title) {
    slug = slugize(title, { transform: this.config.filename_case });
  }
  slug = slug
    .replace(/[\\/:*?"<>|\s]+/g, '-')
    .replace(/^\.+/, '')
    .replace(/^-+|-+$/g, '');

  if (!slug || slug === 'index') {
    slug = title ? `${timestamp}-${slug}`.replace(/-+$/, '') : timestamp;
  }

  const dynamicsDir = path.join(this.source_dir, 'dynamics');
  const noteDir = path.join(dynamicsDir, slug);
  const noteFile = path.join(noteDir, 'index.md');

  // 防止 --slug 通过 .. 等方式写到动态目录之外
  if (path.resolve(noteDir) !== path.join(path.resolve(dynamicsDir), slug)) {
    this.log.error('非法的 slug：%s', slug);
    process.exitCode = 1;
    return;
  }

  if (fs.existsSync(noteFile)) {
    this.log.error('动态已存在：%s', path.relative(this.base_dir, noteFile));
    process.exitCode = 1;
    return;
  }

  // 用 JSON 字符串作为 YAML 标量，避免标题里的 : # 等字符破坏 Front-matter
  const frontMatter = [
    '---',
    `title: ${JSON.stringify(title || now.format('YYYY-MM-DD HH:mm'))}`,
    `date: ${now.format('YYYY-MM-DD HH:mm:ss')}`,
    'tags:',
    '---',
    '',
    ''
  ].join('\n');

  fs.mkdirSync(noteDir, { recursive: true });
  fs.writeFileSync(noteFile, frontMatter, 'utf8');

  this.log.info('Created: %s', path.relative(this.base_dir, noteFile));
  this.log.info('把图片放在 %s 目录，正文里用 ![](图片名) 即可引用；然后运行 hexo generate',
    path.relative(this.base_dir, noteDir));
});
