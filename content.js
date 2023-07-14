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
                console.log("[SPOTIFY2YOUTUBE] swapping with:", newLocation);
                document.location.href = newLocation;
            }
        }
    });

    window.addEventListener("load", function () {
        const title = document.querySelector("h1").innerText;
        const band = document.querySelector("h2").innerText;
        console.log("[SPOTIFY2YOUTUBE] searching for", type, band, "-", title);
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
        return "playlist";
    }
    return null;
}
