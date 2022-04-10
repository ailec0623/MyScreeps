var Creeps = require('creeps');
var Genarator = require('genarator');


module.exports.loop = function () {

    Genarator.run(Game.spawns['Spawn1']);
    Creeps.run();
}