document.addEventListener('DOMContentLoaded', loadUrls);

document.getElementById('shortenForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const urlInput = document.getElementById('urlInput');
  const errorDiv = document.getElementById('error');
  const resultDiv = document.getElementById('result');
  const shortUrlInput = document.getElementById('shortUrl');
  
  errorDiv.style.display = 'none';
  resultDiv.style.display = 'none';
  
  const originalUrl = urlInput.value.trim();
  if (!originalUrl) {
    showError('Please enter a URL');
    return;
  }
  
  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to shorten URL');
    shortUrlInput.value = data.shortUrl;
    resultDiv.style.display = 'block';
    urlInput.value = '';
    loadUrls();
  } catch (error) {
    showError(error.message);
  }
});

async function loadUrls() {
  try {
    const response = await fetch('/api/urls');
    const urls = await response.json();
    const urlList = document.getElementById('urlList');
    if (urls.length === 0) {
      urlList.innerHTML = '<div class="empty">No URLs shortened yet.</div>';
      return;
    }
    urlList.innerHTML = urls.map(url => {
      const shortUrl = '/api/' + url.shortCode;
      const displayUrl = url.originalUrl.length > 50 ? url.originalUrl.substring(0, 50) + '...' : url.originalUrl;
      return '<div class="url-item"><div class="url-info"><a href="' + url.originalUrl + '" target="_blank" class="original-url">' + displayUrl + '</a><a href="' + shortUrl + '" target="_blank" class="short-url">' + shortUrl.replace('http://', '').replace('https://', '') + '</a></div><div class="url-stats"><span class="clicks">' + url.clicks + ' clicks</span></div></div>';
    }).join('');
  } catch (error) {
    console.error('Error loading URLs:', error);
    document.getElementById('urlList').innerHTML = '<div class="empty">Error loading URLs</div>';
  }
}

function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function copyToClipboard() {
  const shortUrlInput = document.getElementById('shortUrl');
  shortUrlInput.select();
  document.execCommand('copy');
  alert('Copied to clipboard!');
}