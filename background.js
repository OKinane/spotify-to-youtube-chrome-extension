chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "replaceSpotifyPlayer") {
      replaceSpotifyPlayerWithYouTubePlayer();
    }
  });

  function replaceSpotifyPlayerWithYouTubePlayer() {
    // Logic to replace Spotify player with YouTube player goes here
  }
