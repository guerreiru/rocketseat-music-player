import audios from './data.js';
import elements from './playerElements.js';
import { progressBarWidth, secondsToMinutes } from './utils.js';

export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  isPlaying: false,
  start() {
    elements.getElements.call(this);
    this.update();
  },
  play() {
    this.audio.play();
    this.audio.volume = 1;
    this.isPlaying = true;
    this.playPause.classList.remove('ph-play-fill');
    this.playPause.classList.add('ph-pause-fill');
  },
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.playPause.classList.remove('ph-pause-fill');
    this.playPause.classList.add('ph-play-fill');
  },
  forward() {
    this.setCurrentTime(this.audio.currentTime + 5);
  },
  backward() {
    if (this.audio.currentTime >= 5) {
      this.setCurrentTime(this.audio.currentTime - 5);
    }
  },
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
      return;
    }

    this.play();
  },
  next() {
    this.currentPlaying++;

    if (this.currentPlaying === this.audioData.length) {
      this.restart();
    }

    this.update();
    this.audio.play();
  },
  setCurrentTime(value) {
    this.audio.currentTime = value;
  },
  timeUpdate() {
    const calcCurrentDuration = this.audio.duration - this.audio.currentTime;

    if (isNaN(calcCurrentDuration)) {
      this.currentDuration.innerText = '00:00';
      return;
    }
    this.currentDuration.innerText = secondsToMinutes(calcCurrentDuration);

    this.seekBar.value = this.audio.currentTime;

    this.progressBar.style.width = `${progressBarWidth(
      this.audio.currentTime,
      this.audio.duration
    )}%`;
  },
  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.cover.style.background = `url('${this.currentAudio.cover}') no-repeat center center / cover`;
    this.title.innerText = this.currentAudio.title;
    this.artist.innerText = this.currentAudio.artist;
    elements.createAudioElement.call(this, this.currentAudio.file);

    this.audio.onloadeddata = () => {
      elements.actions.call(this);
    };
  },
  restart() {
    this.currentPlaying = 0;
    this.update();
  },
};
