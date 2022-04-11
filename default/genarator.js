var config = require('role.config')

var Genarator = {
    run: function(spawns) {
        var creeps = {
            harvester: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == spawns.room),
            upgrader: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == spawns.room),
            builder: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == spawns.room),
            carrier: _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.room == spawns.room),
            fixer: _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer' && creep.room == spawns.room),
            harvesterpro: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterpro' && creep.room == spawns.room),
            picker: _.filter(Game.creeps, (creep) => creep.memory.role == 'picker' && creep.room == spawns.room),
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
                    console.log('Suicide creep: ' + c);
                }

                if(spawns.room.energyAvailable >= this.calculateCost(config[c][spawns.room.controller.level]['mod']) ){
                    for(i in creeps[c]){
                        if(creeps[c][i].memory.level < spawns.room.controller.level){
                            creeps[c][i].suicide();
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
        var energySources = spawns.room.find(FIND_SOURCES, {
            filter: (source) => {
                return source.energy > 0;
            }
        });
        var energySource = null;
        if(energySources.length == 1){
            energySource = energySources[0];
        }else if(energySources.length == 2){
            if(energySources[0].energy < energySources[1].energy){
                energySource = energySources[1];
            }else{
                energySource = energySources[0];
            }
        }
        console.log('Spawning new creep: ' + newName);
        if(spawns.room.energyAvailable >= this.calculateCost(config[c][spawns.room.controller.level]['mod'])){
            spawns.spawnCreep(config[role][spawns.room.controller.level]['mod'], newName, {memory: {role: role, level: spawns.room.controller.level, energySource: energySource}});
        }else{
            spawns.spawnCreep(config[role][spawns.room.controller.level - 1]['mod'], newName, {memory: {role: role, level: spawns.room.controller.level - 1, energySource: energySource}});
        }
           
    },
    calculateCost(mods){
        var cost = 100;
        for(m in mods){
            switch(mods[m]){
                case CARRY:
                case MOVE:
                    cost += 50;
                    break;
                case WORK:
                    cost += 100;
                    break;
                case ATTACK:
                    cost += 80;
                    break;
                case RANGED_ATTACK:
                    cost += 150;
                    break;
                case HEAL:
                    cost += 250;
                    break;
                case CLAIM:
                    cost += 600;
                    break;
                case TOUGH:
                    cost += 10;
                    break;
            }
        }
        return cost;
    }

}



module.exports = Genarator;