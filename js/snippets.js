(function() {
  'use strict';

  // ============================================================
  // SNIPPETS DATABASE
  // ============================================================
  var SNIPPETS = [];

  // ========== JAVASCRIPT ==========
  SNIPPETS.push({
    id: 'debounce',
    category: 'javascript',
    title: 'Debounce Function',
    code: 'function debounce(fn, delay) {\n  var timer;\n  return function() {\n    var args = arguments;\n    clearTimeout(timer);\n    timer = setTimeout(function() {\n      fn.apply(null, args);\n    }, delay || 300);\n  };\n}'
  });

  SNIPPETS.push({
    id: 'throttle',
    category: 'javascript',
    title: 'Throttle Function',
    code: 'function throttle(fn, limit) {\n  var waiting = false;\n  return function() {\n    var args = arguments;\n    if (!waiting) {\n      fn.apply(null, args);\n      waiting = true;\n      setTimeout(function() {\n        waiting = false;\n      }, limit || 300);\n    }\n  };\n}'
  });

  SNIPPETS.push({
    id: 'deepclone',
    category: 'javascript',
    title: 'Deep Clone',
    code: 'function deepClone(obj) {\n  if (!obj || typeof obj !== "object") return obj;\n  if (Array.isArray(obj)) {\n    var arr = [];\n    for (var i = 0; i < obj.length; i++) {\n      arr[i] = deepClone(obj[i]);\n    }\n    return arr;\n  }\n  var copy = {};\n  for (var key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      copy[key] = deepClone(obj[key]);\n    }\n  }\n  return copy;\n}'
  });

  SNIPPETS.push({
    id: 'sleep',
    category: 'javascript',
    title: 'Sleep Function',
    code: 'function sleep(ms) {\n  return new Promise(function(resolve) {\n    setTimeout(resolve, ms);\n  });\n}'
  });

  SNIPPETS.push({
    id: 'unique',
    category: 'javascript',
    title: 'Array Unique',
    code: 'function unique(arr) {\n  var result = [];\n  for (var i = 0; i < arr.length; i++) {\n    if (result.indexOf(arr[i]) === -1) {\n      result.push(arr[i]);\n    }\n  }\n  return result;\n}'
  });

  SNIPPETS.push({
    id: 'capitalize',
    category: 'javascript',
    title: 'Capitalize',
    code: 'function capitalize(str) {\n  if (!str) return "";\n  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();\n}'
  });

  SNIPPETS.push({
    id: 'slugify',
    category: 'javascript',
    title: 'Slugify',
    code: 'function slugify(str) {\n  return str.toLowerCase().trim().replace(/[^\\w\\s-]/g, "").replace(/\\s+/g, "-");\n}'
  });

  SNIPPETS.push({
    id: 'random',
    category: 'javascript',
    title: 'Random Number',
    code: 'function random(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}'
  });

  SNIPPETS.push({
    id: 'randomid',
    category: 'javascript',
    title: 'Random ID',
    code: 'function randomId(len) {\n  len = len || 8;\n  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";\n  var result = "";\n  for (var i = 0; i < len; i++) {\n    result += chars.charAt(Math.floor(Math.random() * chars.length));\n  }\n  return result;\n}'
  });

  SNIPPETS.push({
    id: 'isempty',
    category: 'javascript',
    title: 'Is Empty',
    code: 'function isEmpty(val) {\n  if (!val) return true;\n  if (Array.isArray(val)) return val.length === 0;\n  if (typeof val === "object") return Object.keys(val).length === 0;\n  return false;\n}'
  });

  // ========== CSS ==========
  SNIPPETS.push({
    id: 'glass',
    category: 'css',
    title: 'Glassmorphism',
    code: '.glass {\n  background: rgba(255,255,255,0.1);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  border: 1px solid rgba(255,255,255,0.2);\n  border-radius: 12px;\n  padding: 24px;\n}\n\n[data-theme="dark"] .glass {\n  background: rgba(0,0,0,0.2);\n}'
  });

  SNIPPETS.push({
    id: 'grid',
    category: 'css',
    title: 'CSS Grid',
    code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n  padding: 20px;\n}\n\n.grid-item {\n  background: var(--bg-surface);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 20px;\n}\n\n@media (max-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}'
  });

  SNIPPETS.push({
    id: 'flex',
    category: 'css',
    title: 'Flex Utilities',
    code: '.flex-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n.flex-between {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.flex-column {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}'
  });

  SNIPPETS.push({
    id: 'animation',
    category: 'css',
    title: 'Fade Animation',
    code: '@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.fade-in {\n  animation: fadeIn 0.6s ease forwards;\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n}\n\n.pulse {\n  animation: pulse 2s ease-in-out infinite;\n}'
  });

  SNIPPETS.push({
    id: 'darkmode',
    category: 'css',
    title: 'Dark Mode',
    code: ':root {\n  --bg: #FFFFFF;\n  --text: #000000;\n}\n\n[data-theme="dark"] {\n  --bg: #0B0E14;\n  --text: #E8ECF1;\n}\n\nbody {\n  background: var(--bg);\n  color: var(--text);\n  transition: 0.3s ease;\n}'
  });

  // ========== REACT ==========
  SNIPPETS.push({
    id: 'uselocal',
    category: 'react',
    title: 'useLocalStorage',
    code: 'import { useState, useEffect } from "react";\n\nfunction useLocalStorage(key, initial) {\n  var [value, setValue] = useState(function() {\n    try {\n      var item = localStorage.getItem(key);\n      return item ? JSON.parse(item) : initial;\n    } catch (e) {\n      return initial;\n    }\n  });\n\n  useEffect(function() {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n    } catch (e) {}\n  }, [key, value]);\n\n  return [value, setValue];\n}'
  });

  SNIPPETS.push({
    id: 'usefetch',
    category: 'react',
    title: 'useFetch',
    code: 'import { useState, useEffect } from "react";\n\nfunction useFetch(url) {\n  var [data, setData] = useState(null);\n  var [loading, setLoading] = useState(true);\n  var [error, setError] = useState(null);\n\n  useEffect(function() {\n    async function fetchData() {\n      try {\n        var res = await fetch(url);\n        var json = await res.json();\n        setData(json);\n      } catch (e) {\n        setError(e.message);\n      } finally {\n        setLoading(false);\n      }\n    }\n    fetchData();\n  }, [url]);\n\n  return { data: data, loading: loading, error: error };\n}'
  });

  SNIPPETS.push({
    id: 'usedebounce',
    category: 'react',
    title: 'useDebounce',
    code: 'import { useState, useEffect } from "react";\n\nfunction useDebounce(value, delay) {\n  delay = delay || 300;\n  var [debounced, setDebounced] = useState(value);\n\n  useEffect(function() {\n    var timer = setTimeout(function() {\n      setDebounced(value);\n    }, delay);\n    return function() {\n      clearTimeout(timer);\n    };\n  }, [value, delay]);\n\n  return debounced;\n}'
  });

  // ========== API ==========
  SNIPPETS.push({
    id: 'fetchapi',
    category: 'api',
    title: 'Fetch API',
    code: 'async function fetchData(url, options) {\n  options = options || {};\n  try {\n    var res = await fetch(url, {\n      headers: {\n        "Content-Type": "application/json",\n        ...options.headers\n      },\n      ...options\n    });\n    if (!res.ok) throw new Error("HTTP " + res.status);\n    return await res.json();\n  } catch (e) {\n    console.error(e);\n    return null;\n  }\n}\n\nasync function get(url) { return fetchData(url); }\n\nasync function post(url, data) {\n  return fetchData(url, { method: "POST", body: JSON.stringify(data) });\n}'
  });

  // ========== UTILITY ==========
  SNIPPETS.push({
    id: 'storage',
    category: 'utility',
    title: 'Local Storage',
    code: 'var storage = {\n  set: function(key, value) {\n    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}\n  },\n  get: function(key) {\n    try { var item = localStorage.getItem(key); return item ? JSON.parse(item) : null; } catch (e) { return null; }\n  },\n  remove: function(key) { localStorage.removeItem(key); },\n  clear: function() { localStorage.clear(); }\n};'
  });

  SNIPPETS.push({
    id: 'email',
    category: 'utility',
    title: 'Email Validation',
    code: 'function validateEmail(email) {\n  var regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}'
  });

  SNIPPETS.push({
    id: 'formatdate',
    category: 'utility',
    title: 'Format Date',
    code: 'function formatDate(date) {\n  var d = new Date(date);\n  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];\n  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();\n}'
  });

  // ========== PYTHON ==========
  SNIPPETS.push({
    id: 'pyapi',
    category: 'python',
    title: 'Python API Client',
    code: 'import requests\n\nclass APIClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n        self.session = requests.Session()\n    \n    def get(self, endpoint):\n        url = self.base_url + "/" + endpoint.lstrip("/")\n        response = self.session.get(url)\n        return response.json()\n    \n    def post(self, endpoint, data=None):\n        url = self.base_url + "/" + endpoint.lstrip("/")\n        response = self.session.post(url, json=data)\n        return response.json()'
  });

  // ========== TYPESCRIPT ==========
  SNIPPETS.push({
    id: 'tstypes',
    category: 'typescript',
    title: 'Utility Types',
    code: 'type PartialUser = Partial<{ id: number; name: string; email: string }>;\ntype RequiredUser = Required<{ id?: number; name?: string; email?: string }>;\ntype ReadonlyUser = Readonly<{ id: number; name: string }>;\ntype UserName = Pick<{ id: number; name: string; email: string }, "name" | "email">;\ntype UserWithoutId = Omit<{ id: number; name: string; email: string }, "id">;'
  });

  // ========== NODE.JS ==========
  SNIPPETS.push({
    id: 'nodeserver',
    category: 'node',
    title: 'Express Server',
    code: 'const express = require("express");\nconst app = express();\napp.use(express.json());\napp.get("/", (req, res) => {\n  res.json({ message: "API is running" });\n});\napp.listen(3000, () => {\n  console.log("Server running on port 3000");\n});'
  });

  SNIPPETS.push({
    id: 'nodeauth',
    category: 'node',
    title: 'JWT Auth',
    code: 'const jwt = require("jsonwebtoken");\nconst bcrypt = require("bcryptjs");\n\nfunction verifyToken(req, res, next) {\n  var token = req.headers.authorization;\n  if (!token) return res.status(401).json({ error: "No token" });\n  token = token.split(" ")[1];\n  try {\n    var decoded = jwt.verify(token, "secret");\n    req.user = decoded;\n    next();\n  } catch (e) {\n    return res.status(401).json({ error: "Invalid token" });\n  }\n}'
  });

  // ============================================================
  // RENDER - المهم: عرض الأكواد في الصفحة
  // ============================================================
  var grid = document.getElementById('snippetsGrid');
  var countEl = document.getElementById('snippetCount');

  function renderSnippets(snippets) {
    if (!grid) {
      console.log('Grid not found!');
      return;
    }

    grid.innerHTML = '';

    if (!snippets || snippets.length === 0) {
      grid.innerHTML = '<p style="text-align:center;padding:40px;color:var(--text-muted);">No snippets found</p>';
      return;
    }

    for (var i = 0; i < snippets.length; i++) {
      var s = snippets[i];
      var card = document.createElement('div');
      card.className = 'snippet-card';
      card.setAttribute('data-category', s.category);

      var codeHtml = s.code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

      card.innerHTML =
        '<div class="snippet-header">' +
          '<div class="snippet-meta">' +
            '<span class="snippet-category">' + s.category + '</span>' +
            '<span class="snippet-title">' + s.title + '</span>' +
          '</div>' +
          '<button class="snippet-copy" data-id="' + s.id + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">' +
              '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>' +
              '<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>' +
            '</svg>' +
            '<span class="copy-text">Copy</span>' +
          '</button>' +
        '</div>' +
        '<div class="snippet-body">' +
          '<pre><code id="code-' + s.id + '">' + codeHtml + '</code></pre>' +
        '</div>';

      grid.appendChild(card);
    }

    if (countEl) countEl.textContent = snippets.length;
    console.log('✅ Rendered ' + snippets.length + ' snippets');
  }

  // ============================================================
  // تشغيل الصفحة
  // ============================================================
  console.log('🚀 Loading snippets...');
  renderSnippets(SNIPPETS);

  // ============================================================
  // FILTER - فلترة حسب التصنيف
  // ============================================================
  var tabs = document.querySelectorAll('.filter-tab');

  for (var t = 0; t < tabs.length; t++) {
    (function(tab) {
      tab.addEventListener('click', function() {
        for (var x = 0; x < tabs.length; x++) {
          tabs[x].classList.remove('active');
        }
        tab.classList.add('active');

        var filter = tab.getAttribute('data-filter');

        if (filter === 'all') {
          renderSnippets(SNIPPETS);
        } else {
          var filtered = [];
          for (var i = 0; i < SNIPPETS.length; i++) {
            if (SNIPPETS[i].category === filter) {
              filtered.push(SNIPPETS[i]);
            }
          }
          renderSnippets(filtered);
        }
      });
    })(tabs[t]);
  }

  // ============================================================
  // SEARCH - بحث
  // ============================================================
  var searchInput = document.getElementById('voiceSearchInput');

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      var query = e.target.value.toLowerCase().trim();

      if (query === '') {
        renderSnippets(SNIPPETS);
        return;
      }

      var filtered = [];
      for (var i = 0; i < SNIPPETS.length; i++) {
        var s = SNIPPETS[i];
        var text = (s.title + ' ' + s.category).toLowerCase();
        if (text.indexOf(query) !== -1) {
          filtered.push(s);
        }
      }
      renderSnippets(filtered);
    });
  }

  // ============================================================
  // COPY - نسخ الكود
  // ============================================================
  if (grid) {
    grid.addEventListener('click', function(e) {
      var btn = e.target.closest('.snippet-copy');
      if (!btn) return;

      var id = btn.getAttribute('data-id');
      var codeEl = document.getElementById('code-' + id);
      if (!codeEl) return;

      var text = codeEl.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          btn.classList.add('copied');
          var textSpan = btn.querySelector('.copy-text');
          if (textSpan) textSpan.textContent = 'Copied!';
          setTimeout(function() {
            btn.classList.remove('copied');
            if (textSpan) textSpan.textContent = 'Copy';
          }, 2000);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.classList.add('copied');
        var textSpan = btn.querySelector('.copy-text');
        if (textSpan) textSpan.textContent = 'Copied!';
        setTimeout(function() {
          btn.classList.remove('copied');
          if (textSpan) textSpan.textContent = 'Copy';
        }, 2000);
      }
    });
  }

  // ============================================================
  // VOICE SEARCH - بحث صوتي
  // ============================================================
  var voiceBtn = document.getElementById('voiceSearchBtn');
  var voiceStatus = document.getElementById('voiceSearchStatus');

  if (voiceBtn && 'webkitSpeechRecognition' in window) {
    var SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    voiceBtn.addEventListener('click', function() {
      recognition.start();
      if (voiceStatus) {
        voiceStatus.textContent = '🎤 Listening...';
        voiceStatus.className = 'voice-search-status listening';
      }
      voiceBtn.classList.add('listening');
    });

    recognition.onresult = function(event) {
      var transcript = event.results[0][0].transcript;
      if (searchInput) searchInput.value = transcript;

      var query = transcript.toLowerCase().trim();
      var filtered = [];
      for (var i = 0; i < SNIPPETS.length; i++) {
        var s = SNIPPETS[i];
        var text = (s.title + ' ' + s.category).toLowerCase();
        if (text.indexOf(query) !== -1) {
          filtered.push(s);
        }
      }
      renderSnippets(filtered);

      if (voiceStatus) {
        voiceStatus.textContent = '✅ Searched: "' + transcript + '"';
        voiceStatus.className = 'voice-search-status success';
        setTimeout(function() {
          if (voiceStatus) {
            voiceStatus.textContent = '';
            voiceStatus.className = 'voice-search-status';
          }
        }, 3000);
      }
      voiceBtn.classList.remove('listening');
    };

    recognition.onerror = function() {
      if (voiceStatus) {
        voiceStatus.textContent = '❌ Error, try again';
        voiceStatus.className = 'voice-search-status error';
        setTimeout(function() {
          if (voiceStatus) {
            voiceStatus.textContent = '';
            voiceStatus.className = 'voice-search-status';
          }
        }, 3000);
      }
      voiceBtn.classList.remove('listening');
    };

    recognition.onend = function() {
      voiceBtn.classList.remove('listening');
    };
  } else if (voiceBtn) {
    voiceBtn.style.display = 'none';
  }

  // ============================================================
  // SHARE BUTTONS - أزرار المشاركة
  // ============================================================
  var shareBtns = document.querySelectorAll('.share-btn');
  var pageUrl = encodeURIComponent(window.location.href);
  var pageTitle = encodeURIComponent(document.title);

  for (var b = 0; b < shareBtns.length; b++) {
    (function(btn) {
      btn.addEventListener('click', function() {
        var type = btn.getAttribute('data-share');
        var shareUrl = '';

        switch (type) {
          case 'twitter':
            shareUrl = 'https://twitter.com/intent/tweet?text=' + pageTitle + '&url=' + pageUrl;
            break;
          case 'linkedin':
            shareUrl = 'https://www.linkedin.com/sharing/share-offscreen/?url=' + pageUrl;
            break;
          case 'github':
            shareUrl = 'https://github.com/share?url=' + pageUrl + '&text=' + pageTitle;
            break;
          case 'facebook':
            shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
            break;
          case 'whatsapp':
            shareUrl = 'https://api.whatsapp.com/send?text=' + pageTitle + '%20' + pageUrl;
            break;
          case 'email':
            shareUrl = 'mailto:?subject=' + pageTitle + '&body=Check%20this%20out:%20' + pageUrl;
            break;
          case 'copy':
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(window.location.href).then(function() {
                alert('Link copied!');
              });
            } else {
              var ta = document.createElement('textarea');
              ta.value = window.location.href;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand('copy');
              document.body.removeChild(ta);
              alert('Link copied!');
            }
            return;
          default:
            return;
        }

        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    })(shareBtns[b]);
  }

  // ============================================================
  // UPDATE COPY BUTTONS ON LANGUAGE CHANGE
  // ============================================================
  function updateCopyButtons() {
    var lang = document.documentElement.getAttribute('lang') || 'en';
    var buttons = document.querySelectorAll('.snippet-copy .copy-text');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (!btn.closest('.snippet-copy')?.classList.contains('copied')) {
        btn.textContent = lang === 'ar' ? 'نسخ' : 'Copy';
      }
    }
  }

  var langObserver = new MutationObserver(function() {
    updateCopyButtons();
  });
  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

})();