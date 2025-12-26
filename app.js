// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.log('SW Failed:', err));
    });
}

// Handle Refresh Button
const refreshBtn = document.getElementById('refreshBtn');
const iframe = document.getElementById('infinityTKDFrame');

if (refreshBtn && iframe) {
    refreshBtn.addEventListener('click', () => {
        // Reloads the iframe content
        iframe.src = iframe.src;
    });
}