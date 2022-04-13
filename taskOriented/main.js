var tool = require('tool');
var Generator = require('generator');
var Task = require('task');
var Creeps = require('creeps');
require('./mount')()

module.exports.loop = function () {

    tool.run();
    Generator.run(Game.spawns['Spawn1']);
    for(i in Game.rooms){
        Task.generateTask(Game.rooms[i]);
    }
    
    Creeps.run();
    for(i in Game.rooms){
        Task.cancelTask(Game.rooms[i]);
    }
    
}