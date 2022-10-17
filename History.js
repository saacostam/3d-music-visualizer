class History{
    constructor(len){
        this.len = len;
        this.history = [];
    }

    updateLen(len){
        this.len = len;
        this.history = [];
    }
    
    add(newDataArray){
        if (this.history.length == this.len){
            this.history.shift();
        }
        this.history.push(newDataArray);
    }
}