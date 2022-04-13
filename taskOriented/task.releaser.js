var Releaser = {
    releaseTask: function(room, taskType, sourcePosition, targetPosition, releaserId){
        switch(taskType){
            case 'harvestpro': this.releaseHarvestProTask(room, sourcePosition, targetPosition, releaserId); break;
            case 'pickup': this.releasePickUpTask(room, sourcePosition, targetPosition, releaserId); break;
            case 'delivery': this.releaseDeliveryTask(room, sourcePosition, targetPosition, releaserId); break;
            case 'getenergy': this.releaseGetenergyTask(room, sourcePosition, targetPosition, releaserId); break;
            case 'repair': this.releaseRepairTask(room, sourcePosition, targetPosition, releaserId); break;
            case 'build': this.releaseBuildTask(room, sourcePosition, targetPosition, releaserId); break;
            case 'upgrade': this.releaseUpgradeTask(room, sourcePosition, targetPosition, releaserId); break;
        }
    },
    releaseHarvestProTask(room, sourcePosition, targetPosition, releaserId){
        console.log(66);
        const task = {
            type: 'harvestpro',
            creepId: "",
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: 3,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.harvestpro.push(task);
    },
    releasePickUpTask(room, sourcePosition, targetPosition, releaserId){
        var task = {
            type: 'pickup',
            creepId: "",
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: 3,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.pickup.push(task);
    },
    releaseDeliveryTask(room, sourcePosition, targetPosition, releaserId){
        var task = {
            type: 'delivery',
            creepId: "",
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: 3,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.delivery.push(task);
    },
    releaseGetenergyTask(room, sourcePosition, targetPosition, releaserId){
        var task = {
            type: 'getenergy',
            creepId: "",
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: 3,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.getenergy.push(task);
    },
    releaseRepairTask(room, sourcePosition, targetPosition, releaserId){
        var task = {
            type: 'repair',
            creepId: "",
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: 3,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.repair.push(task);
    },
    releaseBuildTask(room, sourcePosition, targetPosition, releaserId){
        var task = {
            type: 'build',
            creepId: "",
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: 3,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.build.push(task);
    },
    releaseUpgradeTask(room, sourcePosition, targetPosition, releaserId){
        var task = {
            type: 'upgrade',
            creepId: "",
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority: 3,
            releaserId: releaserId
        };
        Memory.rooms[room.name].tasks.upgrade.push(task);
    },
}

module.exports = Releaser;