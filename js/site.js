// APG demo site: framework rail tabs + updates filter. No dependencies.
(function () {
  var STEPS = [["Legislative monitoring & advocacy", "We track relevant bills, resolutions and budget provisions before the Georgia General Assembly that affect autism services, ABA reimbursement and Medicaid policy, and represent APG's positions to lawmakers."], ["Medicaid policy & CMO monitoring", "We monitor DCH actions, CMO contract and rate changes, and formal notices affecting reimbursement methodologies, credentialing rules and policy."], ["Regulatory & agency engagement", "We represent members' interests before DCH and other state agencies by submitting formal comments on proposed rate methodologies, credentialing rules and administrative policy changes."], ["Provider data coordination", "We design, distribute and analyze member surveys that document the scope and impact of policy or payer actions, and turn the findings into advocacy positions."], ["Coalition & stakeholder relations", "We identify and cultivate relationships with allied organizations, legislators and other stakeholders whose support strengthens our advocacy positions."], ["Testimony & public communications", "We prepare testimony, talking points and written materials for legislative hearings, agency comment periods and press engagement on behalf of APG."], ["Member communications & alerts", "We provide regular, timely updates, including legislative tracking summaries, regulatory alerts and CMO transitions."]];
  var rail = document.querySelector('.apg-fw__rail');
  if (rail) {
    var tabs = Array.prototype.slice.call(rail.querySelectorAll('[role="tab"]'));
    var panel = document.getElementById('fw-panel');
    var icons = panel.querySelectorAll('[data-step-icon]');
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', j === i ? 'true' : 'false');
        t.tabIndex = j === i ? 0 : -1;
      });
      icons.forEach(function (ic) { ic.hidden = ic.getAttribute('data-step-icon') !== String(i); });
      panel.querySelector('[data-step-num]').textContent = '0' + (i + 1);
      panel.querySelector('[data-step-title]').textContent = STEPS[i][0];
      panel.querySelector('[data-step-desc]').textContent = STEPS[i][1];
      panel.setAttribute('aria-labelledby', tabs[i].id);
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); select((i + 1) % n, true); }
        else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); select((i - 1 + n) % n, true); }
        else if (k === 'Home') { e.preventDefault(); select(0, true); }
        else if (k === 'End') { e.preventDefault(); select(n - 1, true); }
      });
    });
  }
  // Facebook page feed (Meta Page Plugin). Width is read from the container so it fits phones too.
  var FB_PAGE = 'https://www.facebook.com/AutismProvidersOfGeorgia/';
  document.querySelectorAll('[data-fb-feed]').forEach(function (box) {
    var h = parseInt(box.getAttribute('data-fb-feed'), 10) || 640;
    box.style.minHeight = h + 'px';
    var w = Math.max(180, Math.min(500, Math.floor(box.clientWidth || 500)));
    var src = 'https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent(FB_PAGE) +
      '&tabs=timeline&width=' + w + '&height=' + h +
      '&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false';
    var f = document.createElement('iframe');
    f.src = src; f.width = w; f.height = h; f.title = 'Autism Providers of Georgia on Facebook';
    f.setAttribute('scrolling', 'no'); f.setAttribute('frameborder', '0');
    f.setAttribute('allow', 'clipboard-write; encrypted-media; picture-in-picture; web-share');
    f.style.height = h + 'px';
    box.appendChild(f);
  });

  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    var posts = document.querySelectorAll('[data-kind]');
    var empty = document.querySelector('[data-empty]');
    filters.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter'), shown = 0;
        filters.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        posts.forEach(function (p) {
          var on = f === 'all' || p.getAttribute('data-kind') === f;
          p.hidden = !on; if (on) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  }
})();
