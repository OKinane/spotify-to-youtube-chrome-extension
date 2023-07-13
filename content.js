if (this.document.location.href.includes(".spotify.com/embed/track/")) {
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(function (request) {
        if (
            request.message === "youtubeSearchResults" &&
            request.url === this.document.location.href
        ) {
            const youtubeVideoId = request.firstVideoId;
            if (youtubeVideoId) {
                document.location.href = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`;
            }
        }
    });

    window.addEventListener("load", function () {
        const text = document.querySelector("body").innerText;
        const [title, band, ..._] = text.split("\n");
        chrome.runtime.sendMessage({
            message: "performYouTubeSearch",
            url: this.document.location.href,
            query: `${band} ${title}`,
        });
    });
}
