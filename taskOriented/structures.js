var Releaser = require('task.releaser');
var Tower = require('tower');

var Structure = {
    run: function(){
        for(let i in Game.structures){
            var structure = Game.structures[i];
            var room = Game.structures[i].room;
            if(room){
                this.needRepair(structure, room);
                if(structure.structureType == STRUCTURE_CONTROLLER){
                    this.controllerTasks(structure, room);
                }else if(structure.structureType == STRUCTURE_STORAGE){
                    this.storageTasks(structure, room);
                    this.deliveryTasks(structure, room, 4, 4);
                }else if(structure.structureType == STRUCTURE_SPAWN){
                    this.deliveryTasks(structure, room, 1, 1);
                }else if(structure.structureType == STRUCTURE_EXTENSION){
                    this.deliveryTasks(structure, room, 2, 1);
                }else if(structure.structureType == STRUCTURE_TOWER){
                    Tower.run(structure);
                    this.deliveryTasks(structure, room, 3, 1);
                }
            }
        }
    },
    needRepair: function(s, room){
        if(s.structureType == STRUCTURE_WALL){
            return;
        }
        if(s.structureType == STRUCTURE_RAMPART){
            return;
        }
        if(s.hitsMax - s.hits > 3000){
            let haveTask = 0;
            for (let t in room.memory.tasks.repair) {
                if (room.memory.tasks.repair[t].releaserId == s.id) {
                    haveTask += 1;
                    break;
                }
            }
            if (haveTask == 0) {
                Releaser.releaseTask(room, 'repair', s.pos, s.pos, s.id, 1);
            }
        }
    },
    controllerTasks: function(s, room){
        let haveTask = room.memory.tasks.upgrade.length;
        if (haveTask < 5) {
            Releaser.releaseTask(room, 'upgrade', s.pos, s.pos, s.id, 1);
        }
    },
    storageTasks: function(s, room){
        if(s.store.getUsedCapacity() > 0){
            var haveTask = room.memory.tasks.getenergy.length;
            if (haveTask <7) {
                Releaser.releaseTask(room, 'getenergy', s.pos, s.pos, s.id, 1);
            }
        }
    },
    deliveryTasks: function(s, room, priority, max){
        if(s.store.getFreeCapacity(RESOURCE_ENERGY) < 2){
            return;
        }
        let haveTask = 0;
        for (let t in room.memory.tasks.delivery) {
            if (room.memory.tasks.delivery[t].releaserId == s.id) {
                haveTask += 1;
                break;
            }
        }
        if (haveTask < max) {
            Releaser.releaseTask(room, 'delivery', s.pos, s.pos, s.id, priority);
        }
    }
}
module.exports = Structure;