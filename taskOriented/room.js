var Task = require('task');

var Room = {
    mainRoom: function(room){
        Task.initTasks(room.name);
        Task.spawnTasks(room);
        // Task.repairTask(room);
        for(let i in room.memory.extension){
            this.extensionRoom(room.memory.extension[i]);
        }
        
    },

    extensionRoom: function(room){
        Task.initTasks(room);
        if(!Game.rooms[room]){
            return;
        }
        Task.reserveTask(Game.rooms[room]);
        Task.guardTask(Game.rooms[room]);
        Task.repairTask(Game.rooms[room]);
    },

    powerRoom: function(room){
        var r = Game.rooms[room];
        if(r.find(FIND_STRUCTURE, {
            filter: (s) => {
                return s.structureType == STRUCTURE_POWERBANK;
            }
        })){
            r.memory.needAttack = true;
            return;
        }else{
            r.memory.needAttack = false;
        }
        if(r.find(FIND_DROPPED_RESOURCES, {
            filter: (resource) => {
                return resource.resourceType == RESOURCE_POWER;
            }
        })){
            r.memory.needCollect = true;
            return;
        }else{
            r.memory.needCollect = false;
        }
        Memory.PowerRoom == null;
    }
}

module.exports = Room;