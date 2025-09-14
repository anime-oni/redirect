// assets/js/main.js
(function() {
  const tryPaths = [
    'assets/js/links.json',
    'links.json'
  ];

  function fetchLinks() {
    return Promise.any(tryPaths.map(path => fetch(path).then(res => {
      if (!res.ok) throw new Error("Not found");
      return res.json();
    })));
  }

  fetchLinks()
    .then(links => {
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      const shortCode = pathParts.pop();

      if (!shortCode) {
        // No short code, redirect to homepage
        window.location.href = '/';
        return;
      }

      if (links[shortCode]) {
        // Show message then redirect
        document.body.innerHTML = `
          <div class="box">
            <h1>Redirecting you to ${links[shortCode]}!</h1>
            <h3>If this fails, <a href="${links[shortCode]}">click here</a>.</h3>
          </div>
        `;
        setTimeout(() => {
          window.location.href = links[shortCode];
        }, 1000);
      } else {
        // Not found, redirect to custom 404 page
        window.location.href = "/404.html";
      }
    })
    .catch(() => {
      // Fetch failed, redirect to homepage
      window.location.href = '/';
    });
})();
