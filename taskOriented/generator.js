var config = require('role.config')

var Generator = {
    run: function (spawns) {
        var creeps = {
            guard: _.filter(Game.creeps, (creep) => creep.memory.role == 'guard' && (creep.room == spawns.room || spawns.room.memory.extension.some((r) => r == creep.room.name))),
            harvesterpro: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterpro' && (creep.room == spawns.room || spawns.room.memory.extension.some((r) => r == creep.room.name))),
            carrier: _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && (creep.room == spawns.room || spawns.room.memory.extension.some((r) => r == creep.room.name))),
            worker: _.filter(Game.creeps, (creep) => creep.memory.role == 'worker' && (creep.room == spawns.room || spawns.room.memory.extension.some((r) => r == creep.room.name))),
            reserver: _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && (creep.room == spawns.room || spawns.room.memory.extension.some((r) => r == creep.room.name))),
        };
        // for(c in creeps){
        //     console.log(c + ': ' + creeps[c].length);
        // }

        if (spawns.spawning) {
            var spawningCreep = Game.creeps[spawns.spawning.name];
            spawns.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawns.pos.x + 1,
                spawns.pos.y,
                { align: 'left', opacity: 0.8 });
        } else {
            
            for (var c in creeps) {
                var desiredNum = config[c][spawns.room.controller.level]['num'];
                try{
                    if(c == 'harvesterpro'){
                        let redFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && (flag.room == spawns.room || spawns.room.memory.extension.some((r) => r == flag.room.name)));
                        desiredNum = redFlags.length;
                    }else if(c == 'carrier'){
                        let redFlags = _.filter(Game.flags, (flag) => flag.color == COLOR_RED && (flag.room == spawns.room || spawns.room.memory.extension.some((r) => r == flag.room.name)));
                        desiredNum = redFlags.length + spawns.room.memory.extension.length;
                    }else if(c == 'reserver'){
                        if(spawns.room.memory.extension){
                            for(let r in spawns.room.memory.extension){
                                try{
                                    if(Memory.rooms[spawns.room.memory.extension[r]].tasks.reserve.length > 0){
                                            desiredNum += 1;
                                    }
                                }catch(e){
                                    
                                }
                            }
                        }
                    }else if(c == 'guard'){
                        let guardTasks = [];
                        if(spawns.room.memory.extension){
                            for(let r in spawns.room.memory.extension){
                                try{
                                    guardTasks = guardTasks.concat(Memory.rooms[spawns.room.memory.extension[r]].tasks.guard);
                                }catch(e){

                                }
                            }
                        }
                        desiredNum = guardTasks.length;
                    }else if(c == 'worker'){
                        if(spawns.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 400000){
                            desiredNum += 2;
                        }
                    }
                }catch(e){

                }

                if (creeps[c].length < desiredNum) {
                    this.generator(spawns, c);
                    break;
                }
            }
        }

    },
    generator: function (spawns, role) {
        var newName = role + Game.time;
        console.log(spawns.name + ': Spawning new creep: ' + newName);
        if (spawns.room.energyCapacityAvailable >= this.calculateCost(config[role][spawns.room.controller.level]['mod'])) {
            spawns.spawnCreep(config[role][spawns.room.controller.level]['mod'], newName, { memory: {room: spawns.room.name, role: role, level: spawns.room.controller.level, inTask: false } });
        } else {
            spawns.spawnCreep(config[role][spawns.room.controller.level - 1]['mod'], newName, { memory: {room: spawns.room.name, role: role, level: spawns.room.controller.level - 1, inTask: false } });
        }

    },
    calculateCost(mods) {
        var cost = 0;
        for (var m in mods) {
            switch (mods[m]) {
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



module.exports = Generator;