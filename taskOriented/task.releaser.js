var Releaser = {
    releaseTask: function(room, taskType, sourcePosition, targetPosition){
        switch(taskType){
            case 'harvestpro': this.releaseHarvestProTask(room, creep, sourcePosition, targetPosition); break;
        }
    },
    releaseHarvestProTask(room, sourcePosition, targetPosition){
        if(!room.memory.tasks.harvesterpro){
            room.memory.tasks.harvesterpro = []
        }
        var task = {
            type: 'harvestpro',
            creep_id: null,
            sourcePosition: sourcePosition,
            targetPosition: targetPosition,
            priority = 3
        };
        room.memory.tasks.harvesterpro.push(task);

    }
}

module.exports = Releaser;