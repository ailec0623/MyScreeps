module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}

const creepExtension = {
    buildConstructure(){
        var build_targets = this.room.find(FIND_CONSTRUCTION_SITES);
	    if((this.memory.building && this.store[RESOURCE_ENERGY] == 0) || build_targets.length == 0) {
            this.memory.building = false;
            this.say('🔄 harvest');
	    }
	    if(!this.memory.building && this.store.getFreeCapacity() == 0 && build_targets.length > 0) {
	        this.memory.building = true;
	        this.say('🚧 build');
	    }

	    if(this.memory.building) {
            if(build_targets.length) {
                if(this.build(build_targets[0]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(build_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
            if(!this.withdrawEnergy()){
                this.harvestEnergy();
            }
	    }
    },
    upgraderRoom(){
        if(this.memory.upgrading && this.store[RESOURCE_ENERGY] == 0) {
            this.memory.upgrading = false;
            this.say('🔄 harvest');
	    }
	    if(!this.memory.upgrading && this.store.getFreeCapacity() == 0) {
	        this.memory.upgrading = true;
	        this.say('⚡ upgrade');
	    }

	    if(this.memory.upgrading) {
            if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if(!this.withdrawEnergy()){
                this.harvestEnergy();
            }
        }
    },
    withdrawEnergy(){
        var targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 50;
            }
        });
        if(targets.length > 0){
            if(this.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                return true;
            }
        }
        return false;
    },
    harvestEnergy(){
        var targetsOrder = [STRUCTURE_CONTAINER, STRUCTURE_EXTENSION, STRUCTURE_SPAWN];
        var targets = [];
        if(this.store.getFreeCapacity() > 0) {
    
            if(this.memory.energySource){
                var source = Game.getObjectById(this.memory.energySource.id)
                if(this.harvest(source) == ERR_NOT_IN_RANGE) {
                    this.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                var sources = this.room.find(FIND_SOURCES);
                if(this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            for(t in targetsOrder){
                targets = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == targetsOrder[t] &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0){
                    break;
                }
            }
            if(targets.length > 0) {
                if(this.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
}