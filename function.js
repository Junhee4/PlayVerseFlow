const mediaItems = [
    { id: 'track-1', title: 'DEAF KEV - Invincible', src: 'assets/Musics/DEAF KEV - Invincible Glitch Hop NCS - Copyright Free Music.mp3', preview: 'https://img.youtube.com/vi/J2X5mJ3HDYE/hqdefault.jpg', duration: 'NCS', description: 'Glitch hop energy for listening, studying, and background focus.' },
    { id: 'track-2', title: 'Cartoon - On & On', src: 'assets/Musics/Cartoon, Jéja - On On (feat. Daniel Levi) Electronic Pop NCS - Copyright Free Music.mp3', preview: 'https://img.youtube.com/vi/K4DyBUG242c/hqdefault.jpg', duration: 'NCS', description: 'Bright electronic pop with a huge singalong hook.' },
    { id: 'track-3', title: 'Janji - Heroes Tonight', src: 'assets/Musics/Janji - Heroes Tonight (feat. Johnning) Progressive House NCS - Copyright Free Music.mp3', preview: 'https://img.youtube.com/vi/3nQNiWdeH2Q/hqdefault.jpg', duration: 'NCS', description: 'Progressive house with a cinematic festival feel.' },
    { id: 'track-4', title: 'Warriyo - Mortals', src: 'assets/Musics/Warriyo - Mortals (feat. Laura Brehm) Future Trap NCS - Copyright Free Music.mp3', preview: 'https://img.youtube.com/vi/yJg-Y5byMMw/hqdefault.jpg', duration: 'NCS', description: 'Future trap with dramatic, atmospheric drops.' },
    { id: 'track-5', title: 'Electro-Light - Symbolism', src: 'assets/Musics/Electro-Light - Symbolism _ Trap _ NCS - Copyright Free Music [__CRWE-L45k].mp3', preview: 'https://img.youtube.com/vi/__CRWE-L45k/hqdefault.jpg', duration: 'NCS', description: 'Trap production with a clean, melodic edge.' },
    { id: 'track-6', title: 'Different Heaven & EH!DE - My Heart', src: 'assets/Musics/Different Heaven EH DE - My Heart Drumstep NCS - Copyright Free Music.mp3', preview: 'https://img.youtube.com/vi/jK2aIUmmdP4/hqdefault.jpg', duration: 'NCS', description: 'Drumstep momentum with a nostalgic melodic lift.' },
    { id: 'track-7', title: 'Unknown Brain - Why Do I?', src: 'assets/Musics/Unknown Brain - Why Do I_ (feat. Bri Tolani) _ Trap _ NCS - Copyright Free Music [tcHJodG5hX8].mp3', preview: 'https://img.youtube.com/vi/tcHJodG5hX8/hqdefault.jpg', duration: 'NCS', description: 'Trap track built around a powerful vocal lead.' },
    { id: 'track-8', title: 'Jo Cohen & Sex Whales - We Are', src: 'assets/Musics/Jo Cohen & Sex Whales - We Are _ Future Bass _ NCS - Copyright Free Music [C6IaUMAg3Dc].mp3', preview: 'https://img.youtube.com/vi/C6IaUMAg3Dc/hqdefault.jpg', duration: 'NCS', description: 'Future bass with an uplifting cinematic build.' },
    { id: 'track-9', title: 'Alan Walker - Force', src: 'assets/Musics/Alan Walker - Force [lqYQXIt4SpA].mp3', preview: 'https://img.youtube.com/vi/lqYQXIt4SpA/hqdefault.jpg', duration: 'NCS classic', description: 'Powerful midtempo electro from Alan Walker.' }
];

const historyKey = 'playVerseFlowHistory';
const playlistList = document.getElementById('playlist-list');
const creatorGrid = document.getElementById('creator-grid');
const youtubeGrid = document.getElementById('youtube-grid');
const historyList = document.getElementById('history-list');
const mediaTitle = document.getElementById('media-title');
const mediaType = document.getElementById('media-type');
const mediaPlayer = document.getElementById('media-player');
const statusImage = document.getElementById('status-image');
const buttonPlay = document.getElementById('show-video');
const buttonSource = document.getElementById('show-audio');

const readyImage = 'assets/Logo/Audio Ready.png';
const errorImage = 'assets/Logo/If a Error 153.png';

const youtubeSources = mediaItems.map(item => ({ title: item.title, description: item.description, href: item.preview.replace('https://img.youtube.com/vi/', 'https://www.youtube.com/watch?v=').replace('/hqdefault.jpg', ''), thumb: item.preview }));

function setStatus(ready) {
    statusImage.src = ready ? readyImage : errorImage;
    statusImage.alt = ready ? 'Audio ready status' : 'Playback error status';
}

function loadMedia(item) {
    mediaTitle.innerText = item.title;
    mediaType.innerText = 'Audio';
    mediaPlayer.src = encodeURI(item.src);
    mediaPlayer.load();
    setStatus(true);
    mediaPlayer.play().catch(() => {
        setStatus(false);
    });
    addToHistory(item);
}

function renderPlaylist() {
    playlistList.innerHTML = '';
    mediaItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        li.innerHTML = `<div class="playlist-info"><strong>${item.title}</strong><span>${item.duration} · ${item.description}</span></div><button type="button">Play</button>`;
        li.querySelector('button').addEventListener('click', () => loadMedia(item));
        playlistList.appendChild(li);
    });
}

function renderCreators() {
    creatorGrid.innerHTML = '';
    mediaItems.slice(0, 4).forEach(item => {
        const card = document.createElement('article');
        card.className = 'rec-card';
        card.innerHTML = `<img src="${item.preview}" alt="${item.title}"><div class="rec-body"><h3>${item.title}</h3><p>${item.description}</p><button type="button">Play now</button></div>`;
        card.querySelector('button').addEventListener('click', () => loadMedia(item));
        creatorGrid.appendChild(card);
    });
}

function renderYoutubeSources() {
    youtubeGrid.innerHTML = '';
    youtubeSources.slice(0, 4).forEach(source => {
        const card = document.createElement('article');
        card.className = 'youtube-card';
        card.innerHTML = `<img src="${source.thumb}" alt="${source.title}"><div class="youtube-card-body"><h3>${source.title}</h3><p>${source.description}</p><a href="${source.href}" target="_blank" rel="noopener noreferrer">Open Source</a></div>`;
        youtubeGrid.appendChild(card);
    });
}

function getStoredHistory() {
    try {
        const stored = localStorage.getItem(historyKey);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 8)));
}

function addToHistory(item) {
    const history = getStoredHistory();
    const entry = { id: item.id, title: item.title, type: 'audio', timestamp: new Date().toISOString() };
    const filtered = history.filter(record => record.id !== item.id);
    filtered.unshift(entry);
    saveHistory(filtered);
    renderHistory();
}

function renderHistory() {
    const history = getStoredHistory();
    historyList.innerHTML = '';
    if (history.length === 0) {
        historyList.innerHTML = '<li class="history-item"><div class="history-info"><strong>No history yet</strong><span>Play a track to start your listening log.</span></div></li>';
        return;
    }
    history.forEach(record => {
        const li = document.createElement('li');
        li.className = 'history-item';
        const time = new Date(record.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
        li.innerHTML = `<div class="history-info"><strong>${record.title}</strong><span>${record.type.toUpperCase()} · ${time}</span></div><button type="button">Replay</button>`;
        li.querySelector('button').addEventListener('click', () => {
            const item = mediaItems.find(media => media.id === record.id);
            if (item) loadMedia(item);
        });
        historyList.appendChild(li);
    });
}

buttonPlay.addEventListener('click', () => {
    const item = mediaItems[0];
    if (item) loadMedia(item);
});

buttonSource.addEventListener('click', () => {
    const item = mediaItems[0];
    if (item) window.open(item.preview.replace('https://img.youtube.com/vi/', 'https://www.youtube.com/watch?v=').replace('/hqdefault.jpg', ''), '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('.category-card').forEach((button, index) => {
    button.addEventListener('click', () => {
        const item = mediaItems[index % mediaItems.length];
        if (item) loadMedia(item);
    });
});

mediaPlayer.addEventListener('error', () => setStatus(false));
mediaPlayer.addEventListener('canplay', () => setStatus(true));

window.addEventListener('DOMContentLoaded', () => {
    renderPlaylist();
    renderCreators();
    renderYoutubeSources();
    renderHistory();
    loadMedia(mediaItems[0]);
});
