var Creeps = require('creeps');
var Genarator = require('genarator');
var Extension = require('structure.extension');


module.exports.loop = function () {
    Extension.build(Game.spawns['Spawn1'].room, Game.spawns['Spawn1'].pos);

    Genarator.run(Game.spawns['Spawn1']);
    Creeps.run();
}