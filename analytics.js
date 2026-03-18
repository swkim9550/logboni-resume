// 페이지 조회수 + 행동 분석 트래킹 (Supabase)
(function() {
  var SUPABASE_URL = 'https://vuzwljbxwwlgegwzlxuc.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1endsamJ4d3dsZ2Vnd3pseHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMzMyOTAsImV4cCI6MjA4MjcwOTI5MH0.FK7-h-PLlSv1JIpXcCONRiFZZmBEUEmc8tHXWLOBpYk';
  var API = SUPABASE_URL + '/rest/v1/page_views?apikey=' + SUPABASE_ANON_KEY;
  var headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
    'Content-Type': 'application/json'
  };

  var page = location.pathname.replace('/logboni-resume/', '/') || '/';
  var startTime = Date.now();

  function makePayload(extra) {
    var data = {
      page: page,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      screen_width: screen.width,
      screen_height: screen.height,
      duration_sec: 0
    };
    if (extra) for (var k in extra) data[k] = extra[k];
    return data;
  }

  // 페이지 진입 기록
  fetch(API, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(makePayload())
  }).catch(function() {});

  // 페이지 떠날 때 체류시간 기록 (sendBeacon은 헤더 못 보내므로 URL에 apikey 포함)
  function sendDuration() {
    var sec = Math.round((Date.now() - startTime) / 1000);
    if (sec < 2) return;
    var blob = new Blob([JSON.stringify(makePayload({ duration_sec: sec, event_type: 'leave' }))], { type: 'application/json' });
    navigator.sendBeacon(API, blob);
  }

  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') sendDuration();
  });
})();
