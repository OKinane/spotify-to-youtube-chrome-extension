window.addEventListener("load", function() {
    replaceSpotifyPlayerWithYouTubePlayer();
  });

  function replaceSpotifyPlayerWithYouTubePlayer() {
    // Logic to find and replace Spotify player with YouTube player goes here
    // You can use DOM manipulation techniques to identify and modify the page content
    // For example, you can search for Spotify iframe elements and replace them with YouTube iframe elements
    // Remember to respect the terms of service of the services you are interacting with
  }

  // Send a message to the background script when the page content changes (optional)
  var observer = new MutationObserver(function(mutations) {
    replaceSpotifyPlayerWithYouTubePlayer();
  });

  observer.observe(document.body, { childList: true, subtree: true });
