window.addEventListener("load", function() {
    if (this.document.location.href.includes(".spotify.com/embed")) {
        replaceSpotifyPlayer();
    }
  });

function replaceSpotifyPlayer() {
    const text = document.querySelector("body").innerText;
    const [title, band, ..._] = text.split('\n');

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.message === 'youtubeSearchResults') {
        const youtubeVideoId = request.firstVideoId;
        if (youtubeVideoId) {
            document.location.href = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`;
        }
      }
    });

    chrome.runtime.sendMessage({ message: 'performYouTubeSearch', query: `${band} ${title}` });
}
