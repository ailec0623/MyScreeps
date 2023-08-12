var Tower = {
    run: function(tower){
        var inTask = false;
        if(!inTask){
            inTask = this.attackCreeps(tower);
        }
        if(!inTask && tower.store.getUsedCapacity(RESOURCE_ENERGY) >= 500){
            inTask = this.repairStructures(tower);
        }
    },
    attackCreeps: function(tower){
        var targets = tower.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length > 0){
            tower.attack(targets[0]);
            return true;
        }
    },
    repairStructures: function(tower){
        var targets = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            }
        });
        var target = null;
        for(let i in targets){
            if(targets[i].hits < tower.room.memory.wallHits){
                target = targets[i];
                break;
            }
        }
        if(target){
            tower.repair(target);
            return true;
        }
    },
}

module.exports = Tower;