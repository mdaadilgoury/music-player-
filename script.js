"use strict";
const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("musric_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [{
        path: "C:\Users\Aadil Goury\Desktop\music player\Alan_Walker___Ava_Max_-_Alone,_Pt._II(128k).mp3",
        displayName: "Sugar & Brownies",
        cover: "images (4).jpg",
        artist: "DHARIA",
    },
    {
        path: "imgs_audio/C:\Users\Aadil Goury\Desktop\music player\Alan_Walker___Ava_Max_-_Alone,_Pt._II(128k).mp3.",
        displayName: "Alone, Pt. II",
        cover: "alone.jpg",
        artist: "Alan Walker & Ava Max",
    },
    {
        path: "imgs_audio/3.mp3",
        displayName: "Let Me Love You ft",
        cover: "love.jpg",
        artist: "Justin Bieber",
    },
    {
        path: "imgs_audio/4.mp3",
        displayName: "On The Floor ft",
        cover: "floor.jpg",
        artist: "Jennifer Lopez",
    },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}
//================== Play Music====================
function playMusic() {
    isPlaying = true;
    playvBtnEl.classList.replace("fa-play", "fa-pause");
    playvBtnEl.setAttribute("title", "pause");
    music.play();
}
//================== Pause Music====================
function pauseMusic() {
    isPlaying = false;
    playvBtnEl.classList.replace("fa-pause", "fa-play");
    playvBtnEl.setAttribute("pause", "title");
    music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
    music.src = "C:\Users\Aadil Goury\Desktop\music player\Alan_Walker___Ava_Max_-_Alone,_Pt._II(128k).mp3";
    musicTitleEl.textContent = songs.displayName;
    musicArtistEl.textContent = songs.artist;
    imgCoverEl.src = songs.cover;
    imgEl.src = songs.cover;
}
//================== Change Music ====================
function changeMusic(direction) {
    musicIndex = musicIndex + direction + (songs.length % songs.length);
    loadMusic(songs[musicIndex]);
    playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
    const width = playerProgressEl.clientWidth;
    const xValue = e.offsetX;
    music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
    const { duration, currentTime } = music;
    const ProgressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${ProgressPercent}%`;
    const formattime = (timeRanges) =>
        String(Math.floor(timeRanges)).padStart(2, "0");
    durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
    currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
    playvBtnEl.addEventListener("click", togglePlay);
    nextvBtnEl.addEventListener("click", () => changeMusic(1));
    prevBtnEl.addEventListener("click", () => changeMusic(-1));
    //========= Progressbar===========================
    music.addEventListener("ended", () => changeMusic(1));
    music.addEventListener("timeupdate", updateProgressBar);
    playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);