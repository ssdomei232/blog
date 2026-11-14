/* global window, document */

// 动态列表的相对时间渐进增强：
// 服务端始终渲染完整日期，脚本仅在数据合理时替换为更亲切的相对时间。
(function(window, document) {
  'use strict';

  var MINUTE = 60 * 1000;
  var HOUR = 60 * MINUTE;
  var DAY = 24 * HOUR;
  var MONTH = 30 * DAY;
  function parseTime(value) {
    if (!value) {
      return null;
    }

    // 服务端优先输出带时区的 ISO 8601（date_xml），不同时区访客也能算对相对时间
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})$/.test(value)) {
      var isoDate = new Date(value);
      return isNaN(isoDate.getTime()) ? null : isoDate;
    }

    // 兼容 "YYYY-MM-DD HH:mm:ss" 形式的本地时间（部分浏览器无法直接 Date.parse）
    var matched = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/.exec(value);
    if (matched) {
      return new Date(
        Number(matched[1]),
        Number(matched[2]) - 1,
        Number(matched[3]),
        Number(matched[4]),
        Number(matched[5]),
        Number(matched[6] || 0)
      );
    }

    var parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  // 同时兼容 "{n} 分钟前" 与历史 "%d 分钟前" 两种占位符
  function fillPattern(pattern, amount) {
    if (!pattern) {
      return '';
    }
    if (pattern.indexOf('{n}') >= 0) {
      return pattern.replace('{n}', amount);
    }
    if (pattern.indexOf('%d') >= 0) {
      return pattern.replace('%d', amount);
    }
    return pattern;
  }

  function enhance() {
    var page = document.querySelector('.dynamics-page');
    if (!page) {
      return;
    }

    var times = page.querySelectorAll('time[data-dynamics-time]');
    if (!times.length) {
      return;
    }

    var justNow = page.getAttribute('data-just-now') || '';
    var minutesAgo = page.getAttribute('data-minutes-ago') || '';
    var hoursAgo = page.getAttribute('data-hours-ago') || '';
    var daysAgo = page.getAttribute('data-days-ago') || '';

    var now = Date.now();

    for (var i = 0; i < times.length; i++) {
      var el = times[i];
      var raw = el.getAttribute('data-dynamics-time') || el.getAttribute('datetime');
      var time = parseTime(raw);
      if (!time) {
        continue;
      }

      var elapsed = now - time.getTime();
      if (elapsed < 0) {
        elapsed = 0;
      }

      // 超过 30 天保留服务端渲染的完整日期
      var label = '';
      if (elapsed < MINUTE) {
        label = justNow;
      } else if (elapsed < HOUR) {
        label = fillPattern(minutesAgo, Math.floor(elapsed / MINUTE));
      } else if (elapsed < DAY) {
        label = fillPattern(hoursAgo, Math.floor(elapsed / HOUR));
      } else if (elapsed < MONTH) {
        label = fillPattern(daysAgo, Math.floor(elapsed / DAY));
      }

      if (label) {
        el.textContent = label;
      }
      // 悬停时仍能看到完整的原始时间，datetime 属性保持不动
      if (raw && !el.getAttribute('title')) {
        el.setAttribute('title', raw);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
})(window, document);
