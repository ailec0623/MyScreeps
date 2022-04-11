var Creeps = require('creeps');
var Genarator = require('genarator');

require('./mount')()

module.exports.loop = function () {
    // clear memory
    if(Game.time % 10000 == 0){
        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
    if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
    }
    Genarator.run(Game.spawns['Spawn1']);
    Creeps.run();
}