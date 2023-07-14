chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.message === "performYouTubeSearch") {
        let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            request.query
        )}`;

        if (request.type === "playlist") {
            url += "&" + encodeURIComponent("EgIQAw==");
        }

        console.log("fetching ", url);
        fetch(url)
            .then((response) => response.text())
            .then((htmlContent) => {
                const pattern = request.type === "track" ? '"videoId":"(.+?)"' : '"playlistId":"(PL.+?)"'
                const firstVideoId = htmlContent.match(pattern)[1];
                console.log("found", firstVideoId);
                chrome.tabs.sendMessage(sender.tab.id, {
                    message: "youtubeSearchResults",
                    url: request.url,
                    firstVideoId,
                });
            })
            .catch((error) => {
                console.error("Error performing YouTube search:", error);
            });
    }
});
