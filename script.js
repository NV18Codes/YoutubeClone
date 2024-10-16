const API_KEY = 'AIzaSyCg7Tyg-qa4mK0Ah577ryFEpSveYngkmiU';
const CHANNEL_IDS = [
    'UCe2JAC5FUfbxLCfAvBWmNJA',
    'UCAYum5hCyfkSH5T3vSD_kwQ'
];

async function searchYouTube() {
    const query = document.getElementById('search-input').value;
    const maxResults = 10;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const description = item.snippet.description;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const videoElement = `
            <div class="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnail}" class="w-full h-48 object-cover" alt="${title}">
                </a>
                <div class="p-4">
                    <h2 class="font-semibold text-lg">${title}</h2>
                    <p class="text-gray-600 text-sm">${description}</p>
                </div>
            </div>
        `;

        resultsContainer.innerHTML += videoElement;
    });
}

async function fetchYouTubeVideos() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    for (let channelId of CHANNEL_IDS) {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`;

        const response = await fetch(url);
        const data = await response.json();
        displayVideos(data.items);
    }
}

function displayVideos(videos) {
    const videoList = document.getElementById('results');
    videos.forEach(video => {
        if (video.id.videoId) {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video');
            videoElement.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
                <h3>${video.snippet.title}</h3>
                <p>${video.snippet.description}</p>
            `;
            videoList.appendChild(videoElement);
        }
    });
}

window.addEventListener('load', fetchYouTubeVideos);
