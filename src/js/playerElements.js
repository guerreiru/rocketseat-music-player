import { secondsToMinutes } from './utils.js';

export default {
  getElements() {
    this.cover = document.querySelector('.cover-image');
    this.title = document.querySelector('.music-name');
    this.artist = document.querySelector('.band-name');
    this.currentDuration = document.querySelector('.current-duration');
    this.totalDuration = document.querySelector('.total-duration');
    this.previousTrack = document.querySelector('#previous-track');
    this.playPause = document.querySelector('#play-pause');
    this.nextTrack = document.querySelector('#next-track');
    this.seekBar = document.querySelector('#seekbar');
    this.progressBar = document.querySelector('#progress-bar');
  },

  createAudioElement(audio) {
    this.audio = document.querySelector('#audio-el');
    this.audio.src = audio;
  },
  actions() {
    this.nextTrack.onclick = () => this.forward();
    this.playPause.onclick = () => this.togglePlayPause();
    this.previousTrack.onclick = () => this.backward();
    this.seekBar.oninput = () => this.setCurrentTime(this.seekBar.value);
    this.seekBar.onchange = () => this.setCurrentTime(this.seekBar.value);
    this.seekBar.max = this.audio.duration;
    this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
    this.currentDuration.innerText = secondsToMinutes(this.audio.duration);
    this.audio.ontimeupdate = () => this.timeUpdate();
    this.audio.onended = () => this.next();
  },
};
