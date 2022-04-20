var Tower = {
    run: function(tower){
        var inTask = false;
        if(!inTask){
            inTask = this.attackCreeps(tower);
        }
        if(!inTask && tower.store.getUsedCapacity(RESOURCE_ENERGY) >= 500){
            this.repairStructures(tower);
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
                return structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL;
            }
        });
        if(targets.length > 0){
            tower.repair(targets[0]);
        }
    },
}

module.exports = Tower;