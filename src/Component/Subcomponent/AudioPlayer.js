import "../../ComponentStyle/SubcomponentStyle/AudioPlayer.scss";
import React from "react";

import audioLeft from "../../Logos/audioLeft.svg";
import audioPlay from "../../Logos/audioPlay.svg";
import audioPause from "../../Logos/audioPause.svg";
import audioRight from "../../Logos/audioRight.svg";

export default function AudioPlayer({ musicList, playlistName }) {
  return (
    <div className="audioPlayer-wrapper">
      <CardProfile musicList={musicList} playlistName={playlistName} />
    </div>
  );
}

class CardProfile extends React.Component {
  state = {
    index: 3,
    currentTime: "0:00",
    musicList: this.props.musicList,
    pause: false,
  };

  componentDidMount() {
    this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
    this.playerRef.addEventListener("ended", this.nextSong, false);
    this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
    this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
    this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
    this.playerRef.removeEventListener("ended", this.nextSong);
    this.timelineRef.removeEventListener("click", this.changeCurrentTime);
    this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
    this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
  }

  changeCurrentTime = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth;
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;

    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    this.playheadRef.style.width = userClickWidhtInPercent + "%";
    this.playerRef.currentTime = (duration * userClickWidhtInPercent) / 100;
  };

  hoverTimeLine = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth;

    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    if (userClickWidhtInPercent <= 100) {
      this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
    }

    const time = (duration * userClickWidhtInPercent) / 100;

    if (time >= 0 && time <= duration) {
      this.hoverPlayheadRef.dataset.content = this.formatTime(time);
    }
  };

  resetTimeLine = () => {
    this.hoverPlayheadRef.style.width = 0;
  };

  timeUpdate = () => {
    const duration = this.playerRef.duration;
    const timelineWidth =
      this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
    const playPercent = 100 * (this.playerRef.currentTime / duration);
    this.playheadRef.style.width = playPercent + "%";
    const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
    this.setState({
      currentTime,
    });
  };

  formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);

    const formatTime = minutes + ":" + seconds;

    return formatTime;
  };

  updatePlayer = () => {
    const { musicList, index } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    this.playerRef.load();
  };

  nextSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + 1) % musicList.length,
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  prevSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + musicList.length - 1) % musicList.length,
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  playOrPause = () => {
    const { musicList, index, pause } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    if (!this.state.pause) {
      this.playerRef.play();
    } else {
      this.playerRef.pause();
    }
    this.setState({
      pause: !pause,
    });
  };

  clickAudio = (key) => {
    const { pause } = this.state;

    this.setState({
      index: key,
    });

    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];
    return (
      <div className="card-wrapper">
        <h1 className="card-title">{this.props.playlistName}</h1>
        <div className="card">
          <div className="current-song">
            <audio ref={(ref) => (this.playerRef = ref)}>
              <source src={currentSong.audio} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
            <div className="img-wrap">
              <img src={currentSong.img} />
            </div>
            <span className="song-name">{currentSong.name}</span>
            <span className="song-autor">{currentSong.author}</span>

            <div className="time">
              <div className="current-time">{currentTime}</div>
              <div className="end-time">{currentSong.duration}</div>
            </div>

            <div ref={(ref) => (this.timelineRef = ref)} id="timeline">
              <div ref={(ref) => (this.playheadRef = ref)} id="playhead"></div>
              <div
                ref={(ref) => (this.hoverPlayheadRef = ref)}
                class="hover-playhead"
                data-content="0:00"
              ></div>
            </div>

            <div className="controls">
              <button
                onClick={this.prevSong}
                className="prev prev-next current-btn"
              >
                <img src={audioLeft} alt="audio-left" />
              </button>

              <button onClick={this.playOrPause} className="play current-btn">
                {!pause ? (
                  <img
                    src={audioPlay}
                    alt="audio-play"
                    style={{ margin: "auto" }}
                  />
                ) : (
                  <img
                    src={audioPause}
                    alt="audio-pause"
                    style={{ margin: "auto" }}
                  />
                )}
              </button>
              <button
                onClick={this.nextSong}
                className="next prev-next current-btn"
              >
                <img src={audioRight} alt="audio-right" />
              </button>
            </div>
          </div>
          <div className="play-list">
            {musicList.map((music, key = 0) => (
              <div
                key={key}
                onClick={() => this.clickAudio(key)}
                className={
                  "track " +
                  (index === key && !pause ? "current-audio" : "") +
                  (index === key && pause ? "play-now" : "")
                }
              >
                <img className="track-img" src={music.img} />
                <div className="track-discr">
                  <span className="track-name">{music.name}</span>
                  <span className="track-author">{music.author}</span>
                </div>
                <span className="track-duration">
                  {index === key ? currentTime : music.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
