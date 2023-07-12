window.addEventListener("load", function() {
    if (this.document.location.href.includes(".spotify.com/embed")) {
        replaceSpotifyPlayer();
    }
  });

function replaceSpotifyPlayer() {
    const text = document.querySelector("body").innerText;
    const z = text.split('\n');
    console.log("****** url:", document.location.href);
    console.log("****** band:", z[1]);
    console.log("****** song:", z[0]);
    const youtubeVideoId = "NF-nlerWuc4";
    document.location.href = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`;
}
