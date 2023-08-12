var tool = require('tool');
var Room = require('room');
var Task = require('task');
var Creeps = require('creeps');
var Structures = require('structures');
var Flags = require('flags');
var ConstructionSites = require('constructionsites');
var Spawn = require('spawn');
require('./mount')()

module.exports.loop = function () {
    // Memory.rooms['E41N24'].extension = ['E41N23','E41N25'];
    // Memory.rooms['E41N24'].centralLink = '625db20cf2bd2b39fefce3e5';
    // Memory.rooms['E41N24'].wallHits = 23000000;
    // Memory.rooms['E41N22'].extension = ['E41N21'];
    // Memory.rooms['E41N22'].centralLink = '6264602e293529693489f01c';
    Memory.rooms['E41N22'].wallHits = 1000;
    // Memory.rooms['E42N26'].extension = ['E43N26'];
    // Memory.rooms['E42N26'].centralLink = '62770d19e147d3e361c7b34d';
    // Memory.rooms['E42N26'].wallHits = 250000;
    // Memory.mainRooms = ['E41N24', 'E42N26', 'E41N22', 'E42N21'];
    // Memory.rooms['E42N21'].extension = ['E43N21']
    // Memory.rooms['E42N21'].centralLink = '639af89b1c34ecb0f9e89c2c';
    if(Game.time % 200 == 0){
        if(Game.rooms['E41N24'].storage.store.getUsedCapacity(RESOURCE_ENERGY) >= 400000){
            Memory.rooms['E41N24'].wallHits += 1000;
        }
        if(Game.rooms['E41N22'].storage.store.getUsedCapacity(RESOURCE_ENERGY) >= 400000){
            Memory.rooms['E41N22'].wallHits += 1000;
        }
    }
    tool.run();
    // Generator.run(Game.spawns['Spawn1']);
    // Generator.run(Game.spawns['Spawn2']);
    for(let i in Memory.mainRooms){
        Room.mainRoom(Game.rooms[Memory.mainRooms[i]]);
    }
    for(let i in Game.spawns){
        if(Memory.mainRooms.includes(Game.spawns[i].room.name)){
            try{
                Spawn.acceptTask(Game.spawns[i]);
            }catch(e){
                console.log(e.stack);
            }
        }
    }
    ConstructionSites.run();
    Flags.run();
    Structures.run();
    for(i in Game.rooms){
        Task.sortTasks(Game.rooms[i]);
    }
    Creeps.run();
    for(i in Game.rooms){
        try{
            Task.cancelTask(Game.rooms[i]);
        }catch{
            continue;
        } 
    }
}