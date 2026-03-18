// 페이지 조회수 트래킹 (Supabase)
(function() {
  var SUPABASE_URL = 'https://vuzwljbxwwlgegwzlxuc.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1endsamJ4d3dsZ2Vnd3pseHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMzMyOTAsImV4cCI6MjA4MjcwOTI5MH0.FK7-h-PLlSv1JIpXcCONRiFZZmBEUEmc8tHXWLOBpYk';

  var page = location.pathname.replace('/logboni-resume/', '/') || '/';

  // 조회수 기록
  fetch(SUPABASE_URL + '/rest/v1/page_views', {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      page: page,
      referrer: document.referrer || null
    })
  }).catch(function() {});

  // 조회수 표시
  var el = document.getElementById('view-count');
  if (el) {
    fetch(SUPABASE_URL + '/rest/v1/page_views?select=id&page=eq.' + encodeURIComponent(page), {
      method: 'HEAD',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Prefer': 'count=exact'
      }
    }).then(function(r) {
      var count = r.headers.get('content-range');
      if (count) {
        var total = count.split('/')[1];
        if (total && total !== '*') el.textContent = Number(total).toLocaleString();
      }
    }).catch(function() {});
  }
})();
