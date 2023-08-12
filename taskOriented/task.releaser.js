var Releaser = {
    releaseTask: function(room, taskType, sourcePosition, targetPosition, releaserId, priority, addition){
        // switch(taskType){
        //     case 'harvestpro': this.releaseHarvestProTask(room, sourcePosition, targetPosition, releaserId, priority); break;
        //     case 'pickup': this.releasePickUpTask(room, sourcePosition, targetPosition, releaserId, priority); break;
        //     case 'delivery': this.releaseDeliveryTask(room, sourcePosition, targetPosition, releaserId, priority); break;
        //     case 'getenergy': this.releaseGetenergyTask(room, sourcePosition, targetPosition, releaserId, priority); break;
        //     case 'repair': this.releaseRepairTask(room, sourcePosition, targetPosition, releaserId, priority); break;
        //     case 'build': this.releaseBuildTask(room, sourcePosition, targetPosition, releaserId, priority); break;
        //     case 'upgrade': this.releaseUpgradeTask(room, sourcePosition, targetPosition, releaserId, priority); break;
        // }
        // return;
        const task = {
            type: taskType,
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId,
            addition: addition
        };
        try{
            Memory.rooms[room.name].tasks[taskType].push(task);
        }catch{
            Memory.rooms[room.name].tasks[taskType] = []
        }
        
    },
    releaseHarvestProTask(room, sourcePosition, targetPosition, releaserId, priority){
        const task = {
            type: 'harvestpro',
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.harvestpro.push(task);
    },
    releasePickUpTask(room, sourcePosition, targetPosition, releaserId, priority){
        var task = {
            type: 'pickup',
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.pickup.push(task);
    },
    releaseDeliveryTask(room, sourcePosition, targetPosition, releaserId, priority){
        var task = {
            type: 'delivery',
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.delivery.push(task);
    },
    releaseGetenergyTask(room, sourcePosition, targetPosition, releaserId, priority){
        var task = {
            type: 'getenergy',
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.getenergy.push(task);
    },
    releaseRepairTask(room, sourcePosition, targetPosition, releaserId, priority){
        var task = {
            type: 'repair',
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.repair.push(task);
    },
    releaseBuildTask(room, sourcePosition, targetPosition, releaserId, priority){
        var task = {
            type: 'build',
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.build.push(task);
    },
    releaseUpgradeTask(room, sourcePosition, targetPosition, releaserId, priority){
        var task = {
            type: 'upgrade',
            creepId: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: priority,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.upgrade.push(task);
    },
}

module.exports = Releaser;