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
    transferEnergy(){
        if(this.memory.got && this.store[RESOURCE_ENERGY] == 0) {
            this.memory.got = false;
            this.say('🔄 Getting');
	    }
	    if(!this.memory.got && this.store.getFreeCapacity() == 0) {
	        this.memory.got = true;
	        this.say('🚧 Putting');
	    }

        if(this.memory.got){    
            var targets = this.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType ==STRUCTURE_SPAWN || structure.structureType ==STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(this.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            
        }else{
            this.withdrawEnergy();
        }
    },
    withdrawEnergy(){
        var targets = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 50;
            }
        });

        if(targets.length > 0){
            if(this.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                this.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
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
    },
    fixStructure(){
        if(this.memory.fixing && this.store[RESOURCE_ENERGY] == 0) {
            this.memory.fixing = false;
            this.say('🔄 Getting Energy');
	    }
	    if(!this.memory.fixing && this.store.getFreeCapacity() == 0) {
	        this.memory.fixing = true;
	        this.say('🚧 Fixing');
	    }
        if(this.memory.fixing){
            var targets = this.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL;
                }
            });
            if(targets.length > 0) {
                if(this.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    return;
                }
            }
            
        }else{
            this.withdrawEnergy();
        }
    },
    harvestEnergyPro(){
        if(this.pos.lookFor(LOOK_FLAGS).length > 0 && this.pos.lookFor(LOOK_FLAGS)[0].color == COLOR_RED){
            var sources = this.room.find(FIND_SOURCES);
            
            for(s in sources){
                if(this.harvest(sources[s]) ==  0){
                    return;
                }
            }
        }else{
            var source = this.room.find(FIND_FLAGS, {
                filter: (flag) => {
                    return flag.color == COLOR_RED &&
                    flag.pos.lookFor(LOOK_CREEPS, {
                        filter: (creep) => {
                            return creep.memory.role == 'harvesterpro';
                        }
                    }).length == 0
                }
            });
            if(source.length > 0){
                this.moveTo(source[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    pickEnergy(){
        if(this.memory.got == null){
            this.memory.got = true;
        }
        if(this.memory.got && this.store[RESOURCE_ENERGY] == 0) {
            this.memory.got = false;
            var targets = this.room.find(FIND_DROPPED_RESOURCES);
            var target = null;
            for(t in targets){
                if(!target){
                    target = targets[t];
                }
                if(targets[t].amount > target.amount){
                    target = targets[t];
                }
            }
            this.memory.target = target;
            this.say('🔄 Getting');
	    }
	    if(!this.memory.got && this.store.getFreeCapacity() == 0) {
	        this.memory.got = true;
	        this.say('🚧 Putting');
	    }

        if(this.memory.got){    
            var targets = this.room.find(FIND_FLAGS, {
                filter: (flag) => {
                    return flag.color == COLOR_WHITE &&
                    flag.pos.lookFor(LOOK_STRUCTURES)[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if(targets.length > 0){
                if(this.transfer(targets[0].pos.lookFor(LOOK_STRUCTURES)[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(targets[0].pos.lookFor(LOOK_STRUCTURES)[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }else{
            if(this.memory.target) {
                if(this.pickup(Game.getObjectById(this.memory.target.id)) == ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(this.memory.target.id), {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
}