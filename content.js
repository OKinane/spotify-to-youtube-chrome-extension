const type = getSpotifyEmbeddedPlayerType();

if (type) {
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(function (request) {
        if (
            request.message === "youtubeSearchResults" &&
            request.url === this.document.location.href
        ) {
            const youtubeVideoId = request.firstVideoId;
            if (youtubeVideoId) {
                const newLocation = type == "track" ?
                `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`
                : `https://www.youtube-nocookie.com/embed?listType=playlist&list=${youtubeVideoId}`
                console.log("swapping with ", newLocation);
                document.location.href = newLocation;
            }
        }
    });

    window.addEventListener("load", function () {
        const text = document.querySelector("body").innerText;
        const [title, band, ..._] = text.split("\n");
        chrome.runtime.sendMessage({
            message: "performYouTubeSearch",
            url: this.document.location.href,
            type,
            query: `${band} ${title}`,
        });
    });
}

function getSpotifyEmbeddedPlayerType() {
    if (this.document.location.href.includes(".spotify.com/embed/track/")) {
        return "track";
    }
    if (this.document.location.href.includes(".spotify.com/embed/album/")) {
        // https://open.spotify.com/embed/album/2XlIL7wXd4j2vAUvFI3cO8?si=_2XlJqjSSMOIHzy7JVruUw&utm_source=oembed
        return "playlist";
    }
    return null;
}
