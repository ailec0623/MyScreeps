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
            var links = f.pos.findInRange(FIND_MY_STRUCTURES, 1, {
                filter: (s) =>{
                    return s.structureType == STRUCTURE_LINK;
                }
            });
            if(links.length > 0){
                var addition = {
                    link: links[0].id
                }
            }
            
            Releaser.releaseTask(room, 'harvestpro',f.pos, target.pos, target.id, 1, addition);
        }
    },
    pickupTasks: function(f, room){
        var target1 = null;
        var target2 = null;
        var target = null;
        var amount = 0;
        try{
            target1 = f.pos.lookFor(LOOK_RESOURCES)[0];
            amount += target1.amount;
        }catch(e){
        }
        try{
            target2 = f.pos.lookFor(LOOK_STRUCTURES, {
                filter: (s) => {return s.structureType == STRUCTURE_CONTAINER;}
            })[0];
            amount += target2.store.getUsedCapacity(RESOURCE_ENERGY);
            if(target2.store.getUsedCapacity(RESOURCE_ENERGY) >= 1000){
                target = target2;
            }
        }
        catch{
        }
        if(amount < 100){
            return;
        }
        if(!target1 && !target2){
            return;
        }
        if(!target){
            target = target1?target1:target2;
        }
        
        var haveTask = 0;
        for (var t in room.memory.tasks.pickup) {
            if (room.memory.tasks.pickup[t].releaserId == target.id) {
                haveTask += 1;
            }
        }

        if (haveTask < Math.min(2, (amount / 300))){
            Releaser.releaseTask(room, 'pickup', f.pos, f.pos, target.id, 100 - (amount / 50), null);
        }
    }
}

module.exports = Flag;