var config = require('role.config')

var Genarator = {
    run: function(spawns) {
        var creeps = {
            harvester: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == spawns.room),
            upgrader: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == spawns.room),
            builder: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == spawns.room)
        }
        for(c in creeps){
            console.log(c + ': ' + creeps[c].length);
        }
        
        if(spawns.spawning){
            var spawningCreep = Game.creeps[spawns.spawning.name];
            spawns.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawns.pos.x + 1, 
                spawns.pos.y, 
                {align: 'left', opacity: 0.8});
        }else{
            for(c in creeps){
                if(creeps[c].length < config[c][spawns.room.controller.level]['num']){
                    this.genarator(spawns, c);
                    break;
                }else if(creeps[c].length > config[c][spawns.room.controller.level]['num']){
                    creeps[c][0].suicide();
                }

                if(spawns.room.energyAvailable == spawns.room.controller.level * 500 - 200){
                    for(i in c){
                        if(i.memory.level < spawns.room.controller.level){
                            i.suicide();
                            this.genarator(spawns, c);
                            return;
                        }
                    }
                }
            }
        }

    },
    genarator: function(spawns, role) {
        var newName = role + Game.time;
        console.log('Spawning new creep: ' + newName);
        if(spawns.room.energyCapacityAvailable == spawns.room.controller.level * 500 - 200){
            spawns.spawnCreep(config[role][spawns.room.controller.level]['mod'], newName, {memory: {role: role, level: spawns.room.controller.level}});
        }else{
            spawns.spawnCreep(config[role][spawns.room.controller.level - 1]['mod'], newName, {memory: {role: role, level: spawns.room.controller.level}});
        }
           
    }

}



module.exports = Genarator;