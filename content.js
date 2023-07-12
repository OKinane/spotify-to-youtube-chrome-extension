window.addEventListener("load", function() {
    if (this.document.location.href.includes(".spotify.com/embed")) {
        replaceSpotifyPlayer();
    }
  });

function replaceSpotifyPlayer() {
    const youtubeVideoId = "NF-nlerWuc4";
    document.location.href = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`;
}
