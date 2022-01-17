window.onload = function() {
    document.querySelector(".menu-btn").onclick = function() {
        var header_content = document.querySelector(".header-content");
        var left_header = document.querySelector(".left-header");
        left_header.classList.toggle("active");

        var menu_icon = document.querySelector("ion-icon[name*='menu']");
        var close_icon = document.querySelector("ion-icon[name*='close']");

        if (classIsFind(left_header, "active")) {
            header_content.style.visibility = "visible";
            menu_icon.style.display = "none";
            close_icon.style.display = "block";
        }
        else {
            header_content.style.visibility = "hidden";
            menu_icon.style.display = "block";
            close_icon.style.display = "none";
        }

    }

    createAudio();
}

function classIsFind(elem, className) {
    return elem.classList.contains(className);
}

window.onresize = function() {
    var header_content = document.querySelector(".header-content");
    var left_header = document.querySelector(".left-header");
    if (document.body.clientWidth > 744) {
        header_content.style.visibility = "visible";
    } else if (!classIsFind(left_header, "active")) {
        header_content.style.visibility = "hidden";
    }
}


function createAudio() {
    audios = document.querySelectorAll(".audio");
    let i = 0;
    audios.forEach(function(audio) {
        new Audio(audio);
    });
}


class Audio {
    constructor(body) {
        this.state = "stopped";
        this.body = body
        this.body.onclick = this.enableAudio.bind(this)

        var audio = document.createElement("audio");
        audio.setAttribute("src", this.body.dataset.src);
        this.audio = audio;
        this.body.appendChild(this.audio);

        var playButton = document.createElement("div");
        playButton.classList.add("audio-play-button");
        var playIcon = document.createElement("ion-icon");
        playButton.appendChild(playIcon);
        playIcon.setAttribute("name", "play");
        this.playButton = playButton;
        this.playIcon = playIcon;
        this.body.appendChild(this.playButton);

        var timeField = document.createElement("span");
        timeField.classList.add("audio-time-field");
        timeField.innerHTML = "0:00 / 2:28";
        this.timeField = timeField;
        this.body.appendChild(this.timeField);

        setTimeout(this.audioTick.bind(this), 200);
    }

    enableAudio() {
        this.state = "plays"
        this.playIcon.setAttribute("name", "pause");

        this.audio.play();

        this.audioTick();
        this.audioTickInterval = setInterval(this.audioTick.bind(this), 1000);

        this.body.onclick = this.disableAudio.bind(this);
    }
    disableAudio() {
        this.state = "stopped"
        this.playIcon.setAttribute("name", "play");

        this.audio.pause();

        clearInterval(this.audioTickInterval);

        this.body.onclick = this.enableAudio.bind(this);
    }

    audioTick() {
        var currentProgessTime = new Date(this.audio.currentTime * 1000);

        var mm1 = currentProgessTime.getMinutes();
        if (mm1 < 10) mm1 = '0' + mm1;

        var ss1 = currentProgessTime.getSeconds();
        if (ss1 < 10) ss1 = '0' + ss1;

        var audioLength = new Date(this.audio.duration * 1000);

        var mm2 = audioLength.getMinutes();
        if (mm2 < 10) mm2 = '0' + mm2;

        var ss2 = audioLength.getSeconds();
        if (ss2 < 10) ss2 = '0' + ss2;

        this.timeField.innerHTML = `${mm1}:${ss1} / ${mm2}:${ss2}`;
    }
}