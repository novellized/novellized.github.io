document.addEventListener('DOMContentLoaded', () => {
  // 1. Copy to clipboard handler
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = '#d4af37';
        btn.style.borderColor = '#d4af37';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    });
  });

  // 2. Fetch latest GitHub release assets dynamically
  const REPO = 'novellized/novellized-editor';
  const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

  fetch(API_URL, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(release => {
    if (!release || !release.tag_name) return;

    // Update version badge in Hero
    const badge = document.getElementById('latest-version-badge');
    if (badge) {
      badge.textContent = `Version ${release.tag_name} Available`;
    }

    if (!Array.isArray(release.assets)) return;

    // Map release asset downloads
    release.assets.forEach(asset => {
      const name = asset.name.toLowerCase();
      const url = asset.browser_download_url;

      if (name.endsWith('.deb')) {
        const el = document.getElementById('dl-linux-deb');
        if (el) el.href = url;
      } else if (name.endsWith('.tar.gz') && name.includes('linux')) {
        const el = document.getElementById('dl-linux-tar');
        if (el) el.href = url;
      } else if (name.endsWith('.exe')) {
        const el = document.getElementById('dl-win-exe');
        if (el) el.href = url;
      } else if (name.endsWith('.zip') && name.includes('win32')) {
        const el = document.getElementById('dl-win-zip');
        if (el) el.href = url;
      } else if (name.endsWith('.vsix')) {
        const el = document.getElementById('dl-vsix');
        if (el) el.href = url;
      }
    });
  })
  .catch(() => {
    // Graceful fallback: Default GitHub release link remains active
  });
});
