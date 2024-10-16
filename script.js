const apiKey = 'AIzaSyCDrP02C03LIr9ZecskWY6ExLeDsyo9fcA';
const channelId = 'UCe2JAC5FUfbxLCfAvBWmNJA';
const maxResults = 10;

async function fetchYouTubeVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}`);
    const data = await response.json();
    displayVideos(data.items);
}

function displayVideos(videos) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear previous videos

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnailUrl = video.snippet.thumbnails.medium.url;

        // Create the video card
        const videoCard = `
            <div class="bg-white p-4 rounded-lg shadow-lg">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnailUrl}" alt="${title}" class="rounded-lg mb-4">
                    <p class="font-bold text-lg">${title}</p>
                </a>
            </div>
        `;

        videoContainer.innerHTML += videoCard;
    });
}

// Fetch videos on page load
fetchYouTubeVideos();