hexo.extend.injector.register('body_end', '<script src="/js/snowflake.js"></script>', 'default');
// hexo.extend.injector.register('body_end', '<script src="/js/china-lantern.js"></script>', 'default');
// 预先连接的域名
hexo.extend.injector.register('head_begin', '<link rel="preconnect" href="https://api.mmeiblog.cn"><link rel="preconnect" href="https://img.mmeiblog.cn"><link rel="preconnect" href="https://lib.baomitu.com">', 'default');
hexo.extend.injector.register('head_begin', '<link rel="preconnect" href="https://q1.qlogo.cn">', 'about');