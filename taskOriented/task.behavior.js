var Behavior = {
    harvestPro: function(creep, task){
        
        if(creep.room.name != task.sourcePosition.roomName || creep.pos.x != task.sourcePosition.x || creep.pos.y != task.sourcePosition.y){
            creep.moveTo(new RoomPosition(task.sourcePosition.x, task.sourcePosition.y, task.sourcePosition.roomName), {reusePath: 50});
        }else{
            if(creep.store.getCapacity() > 0 && creep.store.getFreeCapacity() < 20){
                if(creep.memory.task.addition && creep.memory.task.addition.link){
                    creep.transfer(Game.getObjectById(creep.memory.task.addition.link), RESOURCE_ENERGY);
                }
            }
            creep.harvest(Game.getObjectById(task.releaserId));
        }
    },
    pickUp: function(creep, task){
        try{
            var target = Game.getObjectById(task.releaserId);
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }catch(e){
            creep.moveTo(new RoomPosition(task.sourcePosition.x, task.sourcePosition.y, task.sourcePosition.roomName));
        }

    },
    delivery: function(creep, task){
        var target = Game.getObjectById(task.releaserId);
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    getenergy: function(creep, task){
        var target = Game.getObjectById(task.releaserId);
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    repair: function(creep, task){
        var target = Game.getObjectById(task.releaserId);

        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    build: function(creep, task){
        try{
            var target = Game.getObjectById(task.releaserId);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }catch(e){
            creep.moveTo(new RoomPosition(task.targetPosition.x, task.targetPosition.y, task.targetPosition.roomName));
        }

    },
    upgrade: function(creep, task){
        var target = Game.getObjectById(task.releaserId);
        // if(true){
        //     if(creep.signController(target,'😋Newbie, still learning') == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(target);
        //     }
        // }
        if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    reserve: function(creep, task){
        var target = Game.getObjectById(task.releaserId);
        // if(true){
        //     if(creep.signController(target,'😋Newbie, still learning') == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(target);
        //     }
        // }

        if(creep.reserveController(target) == ERR_NOT_IN_RANGE) {
            if(creep.moveTo(target,{reusePath: 50}) != 0){
                creep.moveTo(new RoomPosition(25, 25, task.sourcePosition.roomName), {reusePath: 50});
            }
        }
    },
    guard: function(creep, task){
        var target = Game.getObjectById(task.releaserId);
        var state = creep.attack(target);
        if(state == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }else if(state == ERR_INVALID_TARGET){
            creep.moveTo(new RoomPosition(task.sourcePosition.x, task.sourcePosition.y, task.sourcePosition.roomName), {reusePath: 50});
        }
    },
}

module.exports = Behavior;