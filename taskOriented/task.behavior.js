var Behavior = {
    harvestPro: function(creep, task){
        var target = creep.room.lookForAt(LOOK_SOURCES, task.targetPosition.x, task.targetPosition.y)[0];
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(task.sourcePosition.x, task.sourcePosition.y);
        }
    },
    pickUp: function(creep, task){
        var s = creep.room.lookForAt(LOOK_RESOURCES, task.targetPosition.x, task.targetPosition.y);
        if(s.length == 0){
            s = creep.room.lookForAt(LOOK_STRUCTURES, task.targetPosition.x, task.targetPosition.y);
            if(s.length != 0){

                if(creep.withdraw(s[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s[0]);
                }
            }else{
                creep.memory.inTask = false;
                for(var i in creep.room.memory.tasks.pickup){
                    if(creep.room.memory.tasks.pickup[i].creepId == creep.id){
                        creep.room.memory.tasks.pickup.splice(i, 1);
                        break;
                    }
                }
            }
        }else{
            if(creep.pickup(s[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(s[0]);
            }
        }
    },
    delivery: function(creep, task){
        var target = creep.room.lookForAt(LOOK_STRUCTURES, task.targetPosition.x, task.targetPosition.y)[0];
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    getenergy: function(creep, task){
        var target = creep.room.lookForAt(LOOK_STRUCTURES, task.targetPosition.x, task.targetPosition.y)[0];
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    repair: function(creep, task){
        var target = creep.room.lookForAt(LOOK_STRUCTURES, task.targetPosition.x, task.targetPosition.y)[0];
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    build: function(creep, task){
        var target = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, task.targetPosition.x, task.targetPosition.y)[0];
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    upgrade: function(creep, task){
        var target = creep.room.lookForAt(LOOK_STRUCTURES, task.targetPosition.x, task.targetPosition.y)[0];
        if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
}

module.exports = Behavior;