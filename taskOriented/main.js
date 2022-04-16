var tool = require('tool');
var Generator = require('generator');
var Task = require('task');
var Creeps = require('creeps');
var Tower = require('tower');
require('./mount')()

module.exports.loop = function () {

    tool.run();
    Generator.run(Game.spawns['Spawn1']);
    Tower.run(Game.getObjectById('6259f28012a01f82d85d619f'));
    for(i in Game.rooms){
        Task.generateTask(Game.rooms[i]);
    }
    Creeps.run();
    for(i in Game.rooms){
        Task.cancelTask(Game.rooms[i]);
    }
    // Memory.test = [{p: 4}, {p: 2},{p: 5},{p: 1},{p: 9},{p: 7},];
    // Memory.test.sort((a,b) => {return a.p > b.p;}); 
}