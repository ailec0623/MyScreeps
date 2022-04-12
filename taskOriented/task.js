var Releaser = require('task.releaser');

var Task = {
    generateTask: function(room){
        if(!room.memory.tasks){
            room.memory.tasks = {};
        }
        this.generateHarvestProTask();
    },

    generateHarvestProTask: function(room){
        var redFlags = room.find(FIND_FLAGS, {
            filter: (f) => {
                return f.color == COLOR_RED;
            }
        });
        for(i in redFlags){
            var haveTask = false;
            for(t in room.memory.tasks){
                if(room.memory.tasks[t].type == 'harvestpro' && room.memory.tasks[t].sourcePosition.x == redFlags[i].pos.x && room.memory.tasks[t].sourcePosition.y == redFlags[i].pos.y){
                    haveTask = true;
                    break;
                }
            }
            if(haveTask){
                continue;
            }else{
                var target = redFlags[i].pos.findClosestByRange(FIND_SOURCES, room.find(FIND_SOURCES));
                Releaser.releaseTask(room, 'harvestpro', redFlags[i].pos, target.pos);
            }
        }
    },
    
    cancelTask: function(room){

    }
}

module.exports = Task;