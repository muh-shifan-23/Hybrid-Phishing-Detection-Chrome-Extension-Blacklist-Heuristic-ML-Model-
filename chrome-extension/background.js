// background.js (MV3)

let openPhishList = [];

// Function to fetch and cache OpenPhish feed
async function fetchOpenPhishFeed() {
    try {
        const response = await fetch("https://openphish.com/feed.txt");
        if (!response.ok) throw new Error("Failed to fetch OpenPhish feed");

        const text = await response.text();
        openPhishList = text.split("\n").filter(line => line.trim() !== "");

        // Cache in chrome.storage
        chrome.storage.local.set({
            openphish: {
                list: openPhishList,
                lastFetched: Date.now()
            }
        });

        console.log("✅ OpenPhish feed updated. Total URLs:", openPhishList.length);
    } catch (err) {
        console.error("⚠️ Error fetching OpenPhish feed:", err);
    }
}

// Load cached feed at startup
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get("openphish", (data) => {
        if (data.openphish && data.openphish.list) {
            openPhishList = data.openphish.list;
            console.log("🔄 Loaded cached OpenPhish feed:", openPhishList.length);
        }
    });
});

// Refresh OpenPhish feed every 6 hours
setInterval(fetchOpenPhishFeed, 6 * 60 * 60 * 1000);
fetchOpenPhishFeed(); // Initial fetch on install/startup

// Handle messages from content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "check_url") {
        const url = msg.url;

        // 1. Check OpenPhish feed first
        if (openPhishList.some(phishUrl => url.startsWith(phishUrl))) {
            sendResponse({ source: "openphish", verdict: "phishing" });
            return true;
        }

        // 2. If not found, fallback to ML
        sendResponse({ source: "ml", features: msg.features });
        return true;
    }
    return false;
});
