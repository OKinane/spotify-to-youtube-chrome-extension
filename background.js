  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'performYouTubeSearch') {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(request.query)}`;

      fetch(url)
        .then(response => response.text())
        .then(htmlContent => {
            const firstVideoId = htmlContent.match('"videoId":"(.+?)"')[1];
            chrome.tabs.sendMessage(sender.tab.id, { message: 'youtubeSearchResults', firstVideoId });
        })
        .catch(error => {
          console.error('Error performing YouTube search:', error);
        });
    }
  });
