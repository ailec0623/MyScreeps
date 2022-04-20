var tool = require('tool');
var Generator = require('generator');
var Task = require('task');
var Creeps = require('creeps');
var Structures = require('structures');
var Flags = require('flags');
var ConstructionSites = require('constructionsites');
require('./mount')()

module.exports.loop = function () {

    tool.run();
    Generator.run(Game.spawns['Spawn1']);
    Generator.run(Game.spawns['Spawn2']);
    for(i in Game.rooms){
        Task.initTasks(Game.rooms[i]);
        Task.reserveTask(Game.rooms[i]);
    }
    ConstructionSites.run();
    Flags.run();
    Structures.run();
    Creeps.run();
    for(i in Game.rooms){
        try{
            Task.cancelTask(Game.rooms[i]);
        }catch{
            continue;
        } 
    }
}