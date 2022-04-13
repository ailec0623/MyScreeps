var config = require('role.config')

var Generator = {
    run: function (spawns) {
        var creeps = {
            harvesterpro: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterpro' && creep.room == spawns.room),
            carrier: _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.room == spawns.room),
            worker: _.filter(Game.creeps, (creep) => creep.memory.role == 'worker' && creep.room == spawns.room)
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

                if (creeps[c].length < config[c][spawns.room.controller.level]['num']) {
                    this.generator(spawns, c);
                    break;
                } else if (creeps[c].length > config[c][spawns.room.controller.level]['num']) {
                    creeps[c][0].suicide();
                    console.log('Suicide creep: ' + c);
                }


                if (spawns.room.energyAvailable >= this.calculateCost(config[c][spawns.room.controller.level]['mod'])) {
                    for (i in creeps[c]) {
                        if (creeps[c][i].memory.level < spawns.room.controller.level) {
                            creeps[c][i].suicide();
                            console.log('Update creep: ' + c);
                            this.generator(spawns, c);
                            return;
                        }
                    }
                }
            }
        }

    },
    generator: function (spawns, role) {
        var newName = role + Game.time;
        console.log('Spawning new creep: ' + newName);
        if (spawns.room.energyCapacityAvailable >= this.calculateCost(config[role][spawns.room.controller.level]['mod'])) {
            spawns.spawnCreep(config[role][spawns.room.controller.level]['mod'], newName, { memory: { role: role, level: spawns.room.controller.level, inTask: false } });
        } else {
            spawns.spawnCreep(config[role][spawns.room.controller.level - 1]['mod'], newName, { memory: { role: role, level: spawns.room.controller.level - 1, inTask: false } });
        }

    },
    calculateCost(mods) {
        var cost = 100;
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