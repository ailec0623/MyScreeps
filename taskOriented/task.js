var Releaser = require('task.releaser');

var Task = {
    reserveTask: function (room) {
        if(room.controller.my){
            return;
        }
        if(room.controller.reservation && room.controller.reservation.ticksToEnd > 4000){
            return;
        }
        let haveTask = room.memory.tasks.reserve.length;
        if (haveTask == 0) {
            Releaser.releaseTask(room, 'reserve', room.controller.pos, room.controller.pos, room.controller.id, 1);
        }
    },
    guardTask: function (room) {
        if(!room.controller.reservation || room.controller.reservation.username != 'Ailec'){
            return;
        }
        var targets = room.find(FIND_HOSTILE_CREEPS);
        if(targets.length == 0){
            return;
        }
        let haveTask = room.memory.tasks.guard.length;
        if (haveTask == 0) {
            Releaser.releaseTask(room, 'guard', room.controller.pos, room.controller.pos, targets[0].id, 1);
        }
    },
    repairTask: function(room){
        
        var structures = room.find(FIND_STRUCTURES, {
            filter: (s) => {
                return s.structureType != STRUCTURE_WALL
                    && s.structureType != STRUCTURE_RAMPART
                    && s.hitsMax - s.hits > 2500;
            }
        });
        for(let i in structures){
            let haveTask = 0;
            for (let t in room.memory.tasks.repair) {
                if (room.memory.tasks.repair[t].releaserId == structures[i].id) {
                    haveTask += 1;
                    break;
                }
            }
            if (haveTask == 0) {
                Releaser.releaseTask(room, 'repair', structures[i].pos, structures[i].pos, structures[i].id, 1);
            }
        }
    },
    initTasks: function(room) {
        if (!room.memory.tasks) {
            room.memory.tasks = {};
        }
        if (!room.memory.tasks.guard) {
            room.memory.tasks.guard = []
        }
        if (!room.memory.tasks.delivery) {
            room.memory.tasks.delivery = []
        }
        if (!room.memory.tasks.getenergy) {
            room.memory.tasks.getenergy = []
        }
        if (!room.memory.tasks.repair) {
            room.memory.tasks.repair = []
        }
        if (!room.memory.tasks.upgrade) {
            room.memory.tasks.upgrade = []
        }
        if (!room.memory.tasks.reserve) {
            room.memory.tasks.reserve = []
        }
        if (!room.memory.tasks.harvestpro) {
            room.memory.tasks.harvestpro = []
        }
        if (!room.memory.tasks.pickup) {
            room.memory.tasks.pickup = []
        }
        if (!room.memory.tasks.build) {
            room.memory.tasks.build = []
        }
    },
    sortTasks: function(room) {
      for(let i in room.memory.tasks){
        room.memory.tasks[i].sort((a,b) =>  a.priority - b.priority);
      }  
    },
    
    cancelTask: function (room) {
        for (let j in room.memory.tasks) {
            for (let i in room.memory.tasks[j]) {
                if(j == 'pickup'){
                    room.memory.tasks[j][i].priority -= 0.5;
                }
                // if creep dead, delete the task
                if (room.memory.tasks[j][i].creepId && !Game.getObjectById(room.memory.tasks[j][i].creepId)) {
                    room.memory.tasks[j].splice(i, 1);
                }
                // if releaser dead, delete the task
                if (room.memory.tasks[j][i].releaserId && !Game.getObjectById(room.memory.tasks[j][i].releaserId)) {
                    if(Game.getObjectById(room.memory.tasks[j][i].creepId)){
                        Game.getObjectById(room.memory.tasks[j][i].creepId).memory.inTask = false;
                    }
                    room.memory.tasks[j].splice(i, 1);
                }
            }
        }
    }
}

module.exports = Task;