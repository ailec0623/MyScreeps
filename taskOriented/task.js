var Releaser = require('task.releaser');
var config = require('role.config')

var Task = {
    spawnTasks: function (room) {
        var creeps = {
            guard: _.filter(Game.creeps, (creep) => creep.memory.role == 'guard' && (creep.memory.room == room.name)).length,
            harvesterpro: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterpro' && (creep.memory.room == room.name)).length,
            carrier: _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && (creep.memory.room == room.name)).length,
            worker: _.filter(Game.creeps, (creep) => creep.memory.role == 'worker' && (creep.memory.room == room.name)).length,
            reserver: _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && (creep.memory.room == room.name)).length,
            //getpower: _.filter(Game.creeps, (creep) => creep.memory.role == 'getpower'),
        };
        for(let i in room.memory.tasks.spawn){
            creeps[room.memory.tasks.spawn[i].addition.role] += 1;
        }
        for (var c in creeps) {
            var desiredNum = config[c][room.controller.level]['num'];
            var priority = 10;
            if (c == 'harvesterpro') {
                priority = 3;
                // try{
                    var redFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && (flag.room == room || (flag.room && room.memory.extension.some((r) => r == flag.room.name))));
                // }catch{
                //     var redFlags = []
                //     console.log('task.js: spawnTasks: harvesterpro: redFlags' );
                // }
                
                desiredNum = redFlags.length;
            } else if (c == 'carrier') {
                
                priority = 4;
                if(config[c]['auto']){
                    try{
                        desiredNum = 1 + Math.min(Math.ceil(room.memory.tasks.delivery.length / 8), 2);
                    }catch(e){
                        console.log(e.stack);
                        console.log(room);
                    }
                    
                }else{
                    let redFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && (flag.room == room));
                    desiredNum = redFlags.length + room.memory.extension.length;
                }
            } else if (c == 'reserver') {
                priority = 6;
                if (room.memory.extension && room.controller.level >= 4) {
                    for (let r in room.memory.extension) {
                        try {
                            if (Memory.rooms[room.memory.extension[r]].tasks.reserve.length > 0) {
                                desiredNum += 1;
                            }
                        } catch (e) {

                        }
                    }
                }
            } else if (c == 'guard') {
                priority = 1;
                let guardTasks = [];
                if (room.memory.extension) {
                    for (let r in room.memory.extension) {
                        try {
                            guardTasks = guardTasks.concat(Memory.rooms[room.memory.extension[r]].tasks.guard);
                        } catch (e) {

                        }
                    }
                }
                desiredNum = guardTasks.length;
            } else if (c == 'worker') {
                priority = 5;
                if(room.storage && room.storage.store.getUsedCapacity == 0) {
                    desiredNum = 0;
                }else{
                    if(config[c]['auto']){
                        try{
                            if(room.controller.level == 8){
                                var numTasks = room.memory.tasks.upgrade.length + room.memory.tasks.build.length;
                                for(var i = 0; i < room.memory.extension.length; i++){
                                    numTasks += Memory.rooms[room.memory.extension[i]].tasks.repair.length;
                                    numTasks += Memory.rooms[room.memory.extension[i]].tasks.build.length;
                                }
                                desiredNum = Math.min(Math.ceil(numTasks / 12), 3);
                            }else{
                                desiredNum = 2;
                                if(room.storage && room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 10000){
                                    desiredNum += 2;
                                }
                            }
                            
                        }catch(e){
                            console.log(e.stack);
                            console.log(room);
                        }
                    
                    }else{
                        if (room.storage && room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 400000) {
                            desiredNum += 2;
                        }
                    }
                }
            }

            if (creeps[c] < desiredNum) {
                Releaser.releaseTask(room, 'spawn', null, null, null, priority, {role: c});
            }
        }
    },
    reserveTask: function (room) {
        if (!room.controller) {
            return;
        }
        if (room.controller.my) {
            return;
        }
        if (room.controller.reservation && room.controller.reservation.ticksToEnd > 4000) {
            return;
        }
        let haveTask = room.memory.tasks.reserve.length;
        if (haveTask == 0) {
            Releaser.releaseTask(room, 'reserve', room.controller.pos, room.controller.pos, room.controller.id, 1, null);
        }
    },
    guardTask: function (room) {
        if (!room.controller) {
            return;
        }
        if (!room.controller.reservation || room.controller.reservation.username != 'Ailec') {
            return;
        }
        var targets = room.find(FIND_HOSTILE_CREEPS);
        if (targets.length == 0) {
            targets = room.find(FIND_HOSTILE_STRUCTURES);
        }
        let haveTask = room.memory.tasks.guard.length;
        if (haveTask == 0 && targets.length > 0) {
            Releaser.releaseTask(room, 'guard', room.controller.pos, room.controller.pos, targets[0].id, 1, null);
        }
    },
    repairTask: function (room) {

        var structures = room.find(FIND_STRUCTURES, {
            filter: (s) => {
                return s.structureType == STRUCTURE_ROAD
                    && s.hitsMax - s.hits > 2500;
            }
        });
        for (let i in structures) {
            let haveTask = 0;
            for (let t in room.memory.tasks.repair) {
                if (room.memory.tasks.repair[t].releaserId == structures[i].id) {
                    haveTask += 1;
                    break;
                }
            }
            if (haveTask == 0) {
                Releaser.releaseTask(room, 'repair', structures[i].pos, structures[i].pos, structures[i].id, 1, null);
            }
        }
    },
    initTasks: function (room) {
        if (!Memory.rooms[room]) {
            Memory.rooms[room] = {};
        }
        if (!Memory.rooms[room].tasks) {
            
            Memory.rooms[room].tasks = {};
        }
        if (!Memory.rooms[room].tasks.guard) {
            Memory.rooms[room].tasks.guard = []
        }
        if (!Memory.rooms[room].tasks.delivery) {
            Memory.rooms[room].tasks.delivery = []
        }
        if (!Memory.rooms[room].tasks.getenergy) {
            Memory.rooms[room].tasks.getenergy = []
        }
        if (!Memory.rooms[room].tasks.repair) {
            Memory.rooms[room].tasks.repair = []
        }
        if (!Memory.rooms[room].tasks.upgrade) {
            Memory.rooms[room].tasks.upgrade = []
        }
        if (!Memory.rooms[room].tasks.reserve) {
            Memory.rooms[room].tasks.reserve = []
        }
        if (!Memory.rooms[room].tasks.harvestpro) {
            Memory.rooms[room].tasks.harvestpro = []
        }
        if (!Memory.rooms[room].tasks.pickup) {
            Memory.rooms[room].tasks.pickup = []
        }
        if (!Memory.rooms[room].tasks.build) {
            Memory.rooms[room].tasks.build = []
        }
        if (!Memory.rooms[room].tasks.spawn) {
            Memory.rooms[room].tasks.spawn = []
        }
    },
    sortTasks: function (room) {
        for (let i in room.memory.tasks) {
            room.memory.tasks[i].sort((a, b) => a.priority - b.priority);
        }
    },
    cancelTask: function (room) {
        for (let j in room.memory.tasks) {
            for (let i in room.memory.tasks[j]) {
                if (j == 'pickup') {
                    room.memory.tasks[j][i].priority -= 0.5;
                }
                // if creep dead, delete the task
                if (room.memory.tasks[j][i].creepId && !Game.getObjectById(room.memory.tasks[j][i].creepId)) {
                    room.memory.tasks[j].splice(i, 1);
                }
                // if releaser dead, delete the task
                if (room.memory.tasks[j][i].releaserId && !Game.getObjectById(room.memory.tasks[j][i].releaserId)) {
                    if (Game.getObjectById(room.memory.tasks[j][i].creepId)) {
                        Game.getObjectById(room.memory.tasks[j][i].creepId).memory.inTask = false;
                    }
                    room.memory.tasks[j].splice(i, 1);
                }
            }
        }
    }
}

module.exports = Task;