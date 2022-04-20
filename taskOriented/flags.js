var Releaser = require('task.releaser');

var Flag = {
    run: function(){
        for(let i in Game.flags){
            var room = Game.flags[i].room;
            if(room){
                if(Game.flags[i].color == COLOR_RED){
                    this.harvestproTasks(Game.flags[i], room);
                    this.pickupTasks(Game.flags[i], room);


                }
            }
        }
    },
    harvestproTasks: function(f, room){
        var haveTask = false;
        for (let t in room.memory.tasks.harvestpro) {
            if (room.memory.tasks.harvestpro[t].sourcePosition.x == f.pos.x && room.memory.tasks.harvestpro[t].sourcePosition.y == f.pos.y) {
                haveTask = true;
                break;
            }
        }
        if (!haveTask) {
            var target = f.pos.findClosestByRange(FIND_SOURCES);
            Releaser.releaseTask(room, 'harvestpro',f.pos, target.pos, target.id, 1);
        }
    },
    pickupTasks: function(f, room){
        var target = null;
        var amount = 0;
        try{
            target = f.pos.lookFor(LOOK_STRUCTURES, {
                filter: (s) => {return s.structureType == STRUCTURE_CONTAINER;}
            })[0];
            amount = target.store.getUsedCapacity(RESOURCE_ENERGY);
        }catch(e){
            try{
                target = f.pos.lookFor(LOOK_RESOURCES)[0];
                amount = target.amount;
            }
            catch{
                return;
            }
        }

        var haveTask = 0;
        for (var t in room.memory.tasks.pickup) {
            if (room.memory.tasks.pickup[t].releaserId == target.id) {
                haveTask += 1;
            }
        }

        if (haveTask < 2){
            Releaser.releaseTask(room, 'pickup', target.pos, target.pos, target.id, 100 - (amount / 50));
        }
    }
}

module.exports = Flag;