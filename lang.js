// ページの言語を決める：一度えらんだ言語があればそれ、なければブラウザの言語（日本語なら日本語、それ以外は英語）。
// Picks the page language: the one chosen before, otherwise the browser's (Japanese → Japanese, anything else → English).
(function () {
  var page = document.documentElement.lang === 'ja' ? 'ja' : 'en';
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || 'ja').toLowerCase();
  var want = saved === 'ja' || saved === 'en' ? saved : (nav.indexOf('ja') === 0 ? 'ja' : 'en');
  // このサイトの中のリンクから来たときは、そのページのまま（例：英語のプライバシーポリシー →「Support」）。
  // Coming from a link on this site keeps the page as linked (e.g. English privacy policy → "Support").
  var fromSite = document.referrer.indexOf(location.origin + '/') === 0;
  if (want !== page && !fromSite) { location.replace((want === 'ja' ? './' : 'en.html') + location.hash); return; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-lang]');
    if (a) { try { localStorage.setItem('lang', a.getAttribute('data-lang')); } catch (err) {} }
  });
})();
