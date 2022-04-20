var tool = require('tool');
var Generator = require('generator');
var Task = require('task');
var Creeps = require('creeps');
var Tower = require('tower');
require('./mount')()

module.exports.loop = function () {

    tool.run();
    Generator.run(Game.spawns['Spawn1']);
    //Generator.run(Game.spawns['Spawn2']);
    Generator.run(Game.spawns['Spawn2']);
    Tower.run(Game.getObjectById('6259f28012a01f82d85d619f'));
    Tower.run(Game.getObjectById('625dad351af160b9444462b6'));
    Tower.run(Game.getObjectById('625f45c23f22b85e79ba3b35'));
    for(i in Game.rooms){
        Task.generateTask(Game.rooms[i]);
    }
    Creeps.run();
    for(i in Game.rooms){
        try{
            Task.cancelTask(Game.rooms[i]);
        }catch{
            continue;
        } 
    }
    // Memory.test = [{p: 4}, {p: 2},{p: 5},{p: 1},{p: 9},{p: 7},];
    // Memory.test.sort((a,b) => {return a.p > b.p;}); 
}