// CONFIG
let HISTORY_COUNT = 10;
let MAX_FREQ_BUFFER = 256;
let DETAIL = 1;
let MODE = 'CIRCLE';
let DISTANCE = 100;

// SET UI LISTENERS
let audio = new Audio();
const audioProgress = document.getElementById('progress');
const  playButton = document.getElementById('play');

audio.ondurationchange = (e) => {
    audioProgress.min = 0;
    audioProgress.max = e.target.duration;
}

audio.ontimeupdate = (e) => {
    const currentTime = e.target.currentTime;
    audioProgress.value = currentTime;
}

audio.src = "https://raw.githubusercontent.com/saacostam/music-visualizer/master/music/Armin Van Buuren (Lost Frequencies 2.0 Remix) - In And Out Of Love.mp3";
audio.currentTime = 0;

let normalizer = new Normalizer(audio);
let history = new History(HISTORY_COUNT);

audioProgress.oninput = (e)=>{
    audio.currentTime = e.target.value;
}

playButton.onclick = (e) => {
    const currentlyPlaying = normalizer.togglePlay();

    if (currentlyPlaying){
        e.target.innerText = '||';
    }else{
        e.target.innerText = '▶';
    }
};

const scaleSelect = document.getElementById('scale-select'); 
scaleSelect.addEventListener('input', (e)=>{
    if (e.target.value == 'Logarithmic Scale'){
        normalizer.setLogScale();
        MAX_FREQ_BUFFER = 8;
    }else{
        normalizer.setLinearScale();
        MAX_FREQ_BUFFER = 256;
    }
})

const modeSelect = document.getElementById('mode-select');
modeSelect.addEventListener('input', (e)=>{
    if (e.target.value == 'Circular Display'){
        MODE = 'CIRCLE';
    }else{
        MODE = 'LINEAR';
    }
})

const detailSelect = document.getElementById('detail-select');
detailSelect.addEventListener('input', (e)=>{
    DETAIL = Number( e.target.value );
})

const historyInput = document.getElementById('history-input');
historyInput.addEventListener('input', (e)=>{
    HISTORY_COUNT = Number(e.target.value);
    history.updateLen( HISTORY_COUNT );
})
