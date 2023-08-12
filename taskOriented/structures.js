var Releaser = require('task.releaser');
var Tower = require('structure.tower');

var Structure = {
    run: function(){
        for(let i in Game.structures){
            var structure = Game.structures[i];
            var room = Game.structures[i].room;
            if(room){
                //this.needRepair(structure, room);
                if(structure.structureType == STRUCTURE_CONTROLLER){
                    this.controllerTasks(structure, room);
                }else if(structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER){
                    this.storageTasks(structure, room);
                    if(structure.store.getUsedCapacity(RESOURCE_ENERGY) < Math.max(0.5 * structure.store.getCapacity(RESOURCE_ENERGY), 2000)){
                        this.deliveryTasks(structure, room, 5, 4);
                    }
                }else if(structure.structureType == STRUCTURE_SPAWN){
                    this.deliveryTasks(structure, room, 1, 1);
                }else if(structure.structureType == STRUCTURE_EXTENSION){
                    this.deliveryTasks(structure, room, 2, 1);
                }else if(structure.structureType == STRUCTURE_TOWER){
                    Tower.run(structure);
                    this.deliveryTasks(structure, room, 3, 1);
                }else if(structure.structureType == STRUCTURE_LINK){
                    try{
                        if(structure.id == structure.room.memory.centralLink){
                            if(structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50){
                                this.pickupTasks(structure, room, -100, 2);
                            }
                        }else{
                            if(structure.store.getFreeCapacity(RESOURCE_ENERGY) < 400){
                                structure.transferEnergy(Game.getObjectById(structure.room.memory.centralLink));
                            }
                        }
                    }
                    catch{
                        
                    }

                }else if(structure.structureType == STRUCTURE_LAB){
                    this.deliveryTasks(structure, room, 4, 2);
                }else if(structure.structureType == STRUCTURE_POWER_SPAWN){
                    this.deliveryTasks(structure, room, 4, 1);
                    // if(room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0.1 * room.storage.store.getCapacity(RESOURCE_ENERGY)){
                    //     try{
                    //         console.log(structure.processPower());
                    //     }catch{
                    //         console.log(structure);
                    //     }
                        
                    // }
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
        if(s.hitsMax - s.hits > 20){
            let haveTask = 0;
            for (let t in room.memory.tasks.repair) {
                if (room.memory.tasks.repair[t].releaserId == s.id) {
                    haveTask += 1;
                    break;
                }
            }
            if (haveTask == 0) {
                Releaser.releaseTask(room, 'repair', s.pos, s.pos, s.id, 1, null);
            }
        }
    },
    pickupTasks: function(s, room, priority,times){
        var haveTask = 0;
        for (var t in room.memory.tasks.pickup) {
            if (room.memory.tasks.pickup[t].releaserId == s.id) {
                haveTask += 1;
            }
        }
        if (haveTask < times) {
            Releaser.releaseTask(room, 'pickup', s.pos, s.pos, s.id, priority, null);
        }
    },
    controllerTasks: function(s, room){
        try{
            let haveTask = room.memory.tasks.upgrade.length;
            if(room.controller.level == 8){
                if (haveTask < 5 && room.controller.ticksToDowngrade < 190000) {
    
                    Releaser.releaseTask(room, 'upgrade', s.pos, s.pos, s.id, 1, null);
                }
            }else{
                if (haveTask < 5) {
                    Releaser.releaseTask(room, 'upgrade', s.pos, s.pos, s.id, 1, null);
                }
            }
        }catch(e){
            console.log(room.name)
        }

    },
    storageTasks: function(s, room){
        if(s.store.getUsedCapacity() > 0){
            var haveTask = room.memory.tasks.getenergy.length;
            if (haveTask <7) {
                Releaser.releaseTask(room, 'getenergy', s.pos, s.pos, s.id, 1, null);
            }
        }
    },
    deliveryTasks: function(s, room, priority, max){
        if(s.store.getFreeCapacity(RESOURCE_ENERGY) <0.2 * s.store.getCapacity(RESOURCE_ENERGY) && s.structureType == STRUCTURE_TOWER){
            return; 
        }
        if(s.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            return; 
        }
        let haveTask = 0;
        for (let t in room.memory.tasks.delivery) {
            if (room.memory.tasks.delivery[t].releaserId == s.id) {
                haveTask += 1;
            }
        }
        if (haveTask < max) {
            Releaser.releaseTask(room, 'delivery', s.pos, s.pos, s.id, priority, null);
        }
    }
}
module.exports = Structure;