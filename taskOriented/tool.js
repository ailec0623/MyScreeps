var tool = {
    run: function (){
        this.getPixels();
        this.cleanCreeps();
    },
    getPixels: function(){
        if(Game.cpu.bucket == 10000){
            Game.cpu.generatePixel();
        }
    },

    cleanCreeps: function(){
        if(Game.time % 10000 == 0){
            for(let name in Memory.creeps) {
                if(!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                }
            }
        }
    }
}

module.exports = tool;