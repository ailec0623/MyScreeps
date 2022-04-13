var Releaser = require('task.releaser');

var Task = {
    generateTask: function (room) {
        if (!room.memory.tasks) {
            room.memory.tasks = {};
        }
        this.generateHarvestProTask(room);
        this.generatePickupTask(room);
        this.generateDeliveryTask(room);
        this.generateGetEnergyTask(room);
        this.generateRepairTask(room);
        this.generateBuildTask(room);
        this.generateUpgradeTask(room);
    },

    generateHarvestProTask: function (room) {
        if (!room.memory.tasks.harvestpro) {
            room.memory.tasks.harvestpro = []
        }
        var redFlags = room.find(FIND_FLAGS, {
            filter: (f) => {
                return f.color == COLOR_RED;
            }
        });
        for (var i in redFlags) {
            var haveTask = false;
            for (let t in room.memory.tasks.harvestpro) {
                if (room.memory.tasks.harvestpro[t].sourcePosition.x == redFlags[i].pos.x && room.memory.tasks.harvestpro[t].sourcePosition.y == redFlags[i].pos.y) {
                    haveTask = true;
                    break;
                }
            }

            
            if (haveTask) {
                continue;
            } else {
                var target = redFlags[i].pos.findClosestByRange(FIND_SOURCES);
                Releaser.releaseTask(room, 'harvestpro', redFlags[i].pos, target.pos, null);
            }
        }
    },
    generatePickupTask: function (room) {
        if (!room.memory.tasks.pickup) {
            room.memory.tasks.pickup = []
        }
        var targets = room.find(FIND_DROPPED_RESOURCES).concat(room.find(FIND_FLAGS, {
            filter: (f) => {
                return f.color == COLOR_RED;
            }
        }));
        for (var i in targets) {
            var haveTask = 0;
            for (var t in room.memory.tasks.pickup) {
                if (room.memory.tasks.pickup[t].sourcePosition.x == targets[i].pos.x && room.memory.tasks.pickup[t].sourcePosition.y == targets[i].pos.y) {
                    haveTask += 1;
                }
            }
            var amount = 0;
            if (targets[i].amount) {
                amount = targets[i].amount;
            } else {
                var container = targets[i].pos.lookFor(LOOK_STRUCTURES)[0];
                if (container) {
                    amount = container.store.getUsedCapacity(RESOURCE_ENERGY);
                }
            }
            if (haveTask > amount / 200) {
                continue;
            } else {
                Releaser.releaseTask(room, 'pickup', targets[i].pos, targets[i].pos, targets[i].id);
            }
        }
    },
    generateDeliveryTask: function (room) {
        if (!room.memory.tasks.delivery) {
            room.memory.tasks.delivery = []
        }

        var targets = room.find(FIND_STRUCTURES, {
            filter: (s) => {
                return (s.structureType == STRUCTURE_SPAWN ||
                    s.structureType == STRUCTURE_EXTENSION ||
                    s.structureType == STRUCTURE_STORAGE ||
                    s.structureType == STRUCTURE_TOWER ||
                    s.structureType == STRUCTURE_CONTAINER) &&
                    (s.pos.lookFor(LOOK_FLAGS).length == 0 ||
                        s.pos.lookFor(LOOK_FLAGS)[0].color != COLOR_RED) &&
                    s.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });


        for (var i in targets) {
            var haveTask = 0;
            for (let t in room.memory.tasks.delivery) {
                if (room.memory.tasks.delivery[t].sourcePosition.x == targets[i].pos.x && room.memory.tasks.delivery[t].sourcePosition.y == targets[i].pos.y) {
                    haveTask += 1;
                }
            }
            if (haveTask > 3) {
                continue;
            } else {
                Releaser.releaseTask(room, 'delivery', targets[i].pos, targets[i].pos, targets[i].id);
            }
        }
    },
    generateGetEnergyTask: function (room) {
        if (!room.memory.tasks.getenergy) {
            room.memory.tasks.getenergy = []
        }
        var targets = room.find(FIND_FLAGS, {
            filter: (f) => {
                return f.color == COLOR_WHITE && f.pos.lookFor(LOOK_STRUCTURES)[0].store.getUsedCapacity() > 0;
            }
        });
        for (let i in targets) {
            var haveTask = 0;
            for (let t in room.memory.tasks.getenergy) {
                if (room.memory.tasks.getenergy[t].sourcePosition.x == targets[i].pos.x && room.memory.tasks.getenergy[t].sourcePosition.y == targets[i].pos.y) {
                    haveTask += 1;
                }
            }
            if (haveTask > 0) {
                continue;
            } else {
                Releaser.releaseTask(room, 'getenergy', targets[i].pos, targets[i].pos, targets[i].id);
            }
        }
    },
    generateRepairTask: function (room) {
        if (!room.memory.tasks.repair) {
            room.memory.tasks.repair = []
        }
        var targets = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL;
            }
        });
        for (let i in targets) {
            var haveTask = 0;
            for (let t in room.memory.tasks.repair) {
                if (room.memory.tasks.repair[t].sourcePosition.x == targets[i].pos.x && room.memory.tasks.repair[t].sourcePosition.y == targets[i].pos.y) {
                    haveTask += 1;
                }
            }
            if (haveTask > 0) {
                continue;
            } else {
                Releaser.releaseTask(room, 'repair', targets[i].pos, targets[i].pos, targets[i].id);
            }
        }
    },
    generateBuildTask: function (room) {
        if (!room.memory.tasks.build) {
            room.memory.tasks.build = []
        }
        var targets = room.find(FIND_MY_CONSTRUCTION_SITES);
        for (let i in targets) {
            var haveTask = 0;
            for (let t in room.memory.tasks.build) {
                if (room.memory.tasks.build[t].sourcePosition.x == targets[i].pos.x && room.memory.tasks.build[t].sourcePosition.y == targets[i].pos.y) {
                    haveTask += 1;
                }
            }
            if (haveTask > 3) {
                continue;
            } else {
                Releaser.releaseTask(room, 'build', targets[i].pos, targets[i].pos, targets[i].id);
            }
        }
    },
    generateUpgradeTask: function (room) {
        if (!room.memory.tasks.upgrade) {
            room.memory.tasks.upgrade = []
        }
        var targets = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTROLLER;
            }
        });
        var haveTask = 0;
        for (let t in room.memory.tasks.upgrade) {
            if (room.memory.tasks.upgrade[t].sourcePosition.x == targets[0].pos.x && room.memory.tasks.upgrade[t].sourcePosition.y == targets[0].pos.y) {
                haveTask += 1;
            }
        }
        if (haveTask > 5) {
            return;
        } else {
            Releaser.releaseTask(room, 'upgrade', targets[0].pos, targets[0].pos, targets[0].id);
        }
    },
    
    cancelTask: function (room) {
        for (let j in room.memory.tasks) {
            for (let i in room.memory.tasks[j]) {
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