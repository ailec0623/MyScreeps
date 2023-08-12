var config = require('role.config')
var Generator = {
    acceptTask:function(spawn){
        if(spawn.room.memory.tasks.spawn.length == 0){
            return;
        }
        var result = this.generator(spawn, spawn.room.memory.tasks.spawn[0].addition.role);
        if( result== 0){
            spawn.room.memory.tasks.spawn.splice(0, 1);
        }
    },
    generator: function (spawns, role) {
        if(config[role]['auto']){
            return this.assumbleSpawn(spawns, role);
        }else{
            return this.nomalSpawn(spawns, role);
        }
    },
    assumbleSpawn: function (spawns, role) {
        var newName = role + Game.time; 
        console.log(spawns.name + ': Spawning new creep(assumble): ' + newName);
        var restEnergy = Math.min(spawns.room.energyCapacityAvailable * 0.8 - this.calculateCost(config[role]['auto']['base']), 6000);
        var extendEnergy = this.calculateCost(config[role]['auto']['extend']);
        var assumble = config[role]['auto']['base'];
        for(var i = 0; i < Math.floor(restEnergy / extendEnergy); i++) {
            if(assumble.length >= 45 || i == config[role]['auto']['max']){
                break;
            }
            assumble = assumble.concat(config[role]['auto']['extend']);
        }
        return spawns.spawnCreep(assumble, newName, { memory: {room: spawns.room.name, role: role, level: spawns.room.controller.level, inTask: false } });
    },
    nomalSpawn: function (spawns, role) {
        var newName = role + Game.time;
        console.log(spawns.name + ': Spawning new creep(normal): ' + newName);
        if (spawns.room.energyCapacityAvailable >= this.calculateCost(config[role][spawns.room.controller.level]['mod'])) {
            return spawns.spawnCreep(config[role][spawns.room.controller.level]['mod'], newName, { memory: {room: spawns.room.name, role: role, level: spawns.room.controller.level, inTask: false } });
        } else {
            return spawns.spawnCreep(config[role][(spawns.room.controller.level - 1) < 1?1:(spawns.room.controller.level - 1)]['mod'], newName, { memory: {room: spawns.room.name, role: role, level: spawns.room.controller.level - 1, inTask: false } });
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