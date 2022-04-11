var Creeps = require('creeps');
var Genarator = require('genarator');

require('./mount')()

module.exports.loop = function () {
    // clear memory
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    Genarator.run(Game.spawns['Spawn1']);
    Creeps.run();
}