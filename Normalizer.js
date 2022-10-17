class Normalizer{
    constructor(audio){
        // If a instance already exists, return that instance (Singleton Pattern)
        if (typeof Normalizer.instance === 'object'){
            return Normalizer.instance;
        }
        
        // Audio Settings
        
        this.audio = audio;
        this.audio.crossOrigin = "anonymous";
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
        this.analyser = this.audioCtx.createAnalyser();
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.analyser.fftSize = 1024;
        this.bufferLength = this.analyser.frequencyBinCount;
        
        // Config
        
        this.scaleType = 'linear';

        // Utils

        this.playing = false;
        
        // Define only instance as a Class Variable
        Normalizer.instance = this;
        return this
    }
    
    setLinearScale(){
        this.scaleType = 'linear';
    }
    
    setLogScale(){
        this.scaleType = 'log';
    }
    
    scaleLogToLinear(){
        let newDataArray = [];
        let pow2 = 1;
        
        while (pow2 <= 256){
            const initIndex = pow2 - 1;
            const finalIndex = (2*pow2) - 1;
            
            let sum = 0;
            for (let i = initIndex; i<finalIndex; i++){
            sum += this.dataArray[i];
            }
            
            const n = finalIndex - initIndex;
            newDataArray.push( sum/n );
            
            pow2 *= 2;
        }
        
        this.dataArray = new Uint8Array(newDataArray);
    }
      
    getData(){
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteFrequencyData(this.dataArray);
        
        if (this.scaleType == 'log'){
            this.scaleLogToLinear();
        }
        
        return this.dataArray;
    }

    togglePlay(){
        if (this.audio.paused){
            this.audio.play();
        }else{
            this.audio.pause();
        }

        return !(this.audio.paused)
    }
}