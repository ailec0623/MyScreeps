var Behavior = require('task.behavior');

module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}
const creepExtension = {
    acceptTask: function () {
        if (this.memory.inTask || this.spawning) {
            return;
        }
        switch (this.memory.role) {
            case 'harvesterpro':
                let harvestproTasks = Memory.rooms[this.memory.room].tasks.harvestpro;
                if(Memory.rooms[this.memory.room].extension){
                    for(let r in Memory.rooms[this.memory.room].extension){
                        if(Memory.rooms[Memory.rooms[this.memory.room].extension[r]].tasks.guard.length > 0){
                            continue;
                        }

                        try{
                            harvestproTasks = harvestproTasks.concat(Memory.rooms[Memory.rooms[this.memory.room].extension[r]].tasks.harvestpro);
                        }catch(e){
                            console.log(e.stack);
                        }
                    }
                } 
                
                for (var i in harvestproTasks) {
                    if (!harvestproTasks[i].creepId && !this.memory.inTask) {
                        harvestproTasks[i].creepId = this.id;
                        this.memory.task = harvestproTasks[i];
                        this.memory.inTask = true;
                        break;
                    }
                }
                break;
            case 'carrier':
                if (this.store[RESOURCE_ENERGY] == 0) {
                    let pickupTasks = Memory.rooms[this.memory.room].tasks.pickup;
                    if(pickupTasks[0] && pickupTasks[0].priority < 70){

                    }else{
                        if(Memory.rooms[this.memory.room].extension){
                            for(let r in Memory.rooms[this.memory.room].extension){
                                if(Memory.rooms[Memory.rooms[this.memory.room].extension[r]].tasks.guard.length > 0){
                                    continue;
                                }
                                try{
                                    pickupTasks = pickupTasks.concat(Game.rooms[Memory.rooms[this.memory.room].extension[r]].memory.tasks.pickup);
                                }catch(e){
        
                                }
                            }
                        }
                        pickupTasks.sort((a,b) => a.priority - b.priority);
                    }
                    
                    for (var i in pickupTasks) {
                        if (!pickupTasks[i].creepId && !this.memory.inTask) {
                            pickupTasks[i].creepId = this.id;
                            this.memory.task = pickupTasks[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    for (var i in Memory.rooms[this.memory.room].tasks.getenergy) {
                        if (!Memory.rooms[this.memory.room].tasks.getenergy[i].creepId && !this.memory.inTask) {
                            Memory.rooms[this.memory.room].tasks.getenergy[i].creepId = this.id;
                            this.memory.task = Memory.rooms[this.memory.room].tasks.getenergy[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                } else {
                    
                    //Memory.rooms[this.memory.room].tasks.delivery.sort((a,b) =>  a.priority - b.priority);
                    for (var i in Memory.rooms[this.memory.room].tasks.delivery) {
                        if (!Memory.rooms[this.memory.room].tasks.delivery[i].creepId && !this.memory.inTask) {
                            Memory.rooms[this.memory.room].tasks.delivery[i].creepId = this.id;
                            this.memory.task = Memory.rooms[this.memory.room].tasks.delivery[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                }
                break;
            case 'worker':
                if (this.store[RESOURCE_ENERGY] == 0) {
                    for (var i in Memory.rooms[this.memory.room].tasks.getenergy) {
                        if (!Memory.rooms[this.memory.room].tasks.getenergy[i].creepId && !this.memory.inTask) {
                            Memory.rooms[this.memory.room].tasks.getenergy[i].creepId = this.id;
                            this.memory.task = Memory.rooms[this.memory.room].tasks.getenergy[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    for (var i in Memory.rooms[this.memory.room].tasks.pickup) {
                        if (!Memory.rooms[this.memory.room].tasks.pickup[i].creepId && !this.memory.inTask) {
                            Memory.rooms[this.memory.room].tasks.pickup[i].creepId = this.id;
                            this.memory.task = Memory.rooms[this.memory.room].tasks.pickup[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                } else {
                    // Memory.rooms[this.memory.room].tasks.delivery.sort((a,b) =>  a.priority - b.priority);
                    // for (var i in Memory.rooms[this.memory.room].tasks.delivery) {
                    //     console.log(Memory.rooms[this.memory.room].tasks.delivery[i].priority)
                    //     if(Memory.rooms[this.memory.room].tasks.delivery[i].priority == 4){
                    //         continue;
                    //     }
                    //     if (!Memory.rooms[this.memory.room].tasks.delivery[i].creepId && !this.memory.inTask) {
                    //         Memory.rooms[this.memory.room].tasks.delivery[i].creepId = this.id;
                    //         this.memory.task = Memory.rooms[this.memory.room].tasks.delivery[i];
                    //         this.memory.inTask = true;
                    //         break;
                    //     }
                    // }
                    let repairTasks = Memory.rooms[this.memory.room].tasks.repair;
                    if(Memory.rooms[this.memory.room].extension){
                        for(let r in Memory.rooms[this.memory.room].extension){
                            try{
                                repairTasks = repairTasks.concat(Game.rooms[Memory.rooms[this.memory.room].extension[r]].memory.tasks.repair);
                            }catch(e){

                            }
                        }
                    }
                    
                    for (var i in repairTasks) {
                        if (!repairTasks[i].creepId && !this.memory.inTask) {
                            repairTasks[i].creepId = this.id;
                            this.memory.task = repairTasks[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    
                    let buildTasks = Memory.rooms[this.memory.room].tasks.build;
                    if(Memory.rooms[this.memory.room].extension){
                        for(let r in Memory.rooms[this.memory.room].extension){
                            try{
                                buildTasks = buildTasks.concat(Game.rooms[Memory.rooms[this.memory.room].extension[r]].memory.tasks.build);
                            }catch(e){

                            }
                        }
                    }
                    for (var i in buildTasks) {
                        if (!buildTasks[i].creepId && !this.memory.inTask) {
                            buildTasks[i].creepId = this.id;
                            this.memory.task = buildTasks[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    
                    for (var i in Memory.rooms[this.memory.room].tasks.upgrade) {
                        if (!Memory.rooms[this.memory.room].tasks.upgrade[i].creepId && !this.memory.inTask) {
                            Memory.rooms[this.memory.room].tasks.upgrade[i].creepId = this.id;
                            this.memory.task = Memory.rooms[this.memory.room].tasks.upgrade[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                }
                break;
            case 'reserver':
                let reserveTasks = [];
                if(Memory.rooms[this.memory.room].extension){
                    for(let r in Memory.rooms[this.memory.room].extension){
                        
                        if(Memory.rooms[Memory.rooms[this.memory.room].extension[r]].tasks.guard.length > 0){
                            continue;
                        }
                        try{
                            reserveTasks = reserveTasks.concat(Memory.rooms[Memory.rooms[this.memory.room].extension[r]].tasks.reserve);
                        }catch(e){

                        }
                    }
                }
                for (var i in reserveTasks) {
                    if (!reserveTasks[i].creepId && !this.memory.inTask) {
                        reserveTasks[i].creepId = this.id;
                        this.memory.task = reserveTasks[i];
                        this.memory.inTask = true;
                        break;
                    }
                }
                break;
            case 'guard':
                let guardTasks = [];
                if(Memory.rooms[this.memory.room].extension){
                    for(let r in Memory.rooms[this.memory.room].extension){
                        try{
                            guardTasks = guardTasks.concat(Memory.rooms[Memory.rooms[this.memory.room].extension[r]].tasks.guard);
                        }catch(e){

                        }
                    }
                }
                for (var i in guardTasks) {
                    if (!guardTasks[i].creepId && !this.memory.inTask) {
                        guardTasks[i].creepId = this.id;
                        this.memory.task = guardTasks[i];
                        this.memory.inTask = true;
                        break;
                    }
                }
                break;
            case 'getpower':
                this.memory.inTask = true;
                break;
        }
    },
    operate: function () {
        if(this.spawning){
            return;
        }
        if (this.memory.inTask) {
            if(this.memory.role == 'm'){
                this.moveTo(new RoomPosition(25, 25, 'E43N21'));
                return;
            }
            if(this.memory.role == 'a'){
                if(this.room.name != 'E43N21'){
                    this.moveTo(new RoomPosition(30, 45, 'E43N21'));
                }else{
                    if(this.dismantle(Game.getObjectById('63598e9858b1ca287f9ce80c')) != 0){
                        this.moveTo(Game.getObjectById('63598e9858b1ca287f9ce80c'));
                    }
                }
            }
            if(this.memory.role == 'claimer'){
                var room = Game.rooms['E42N21'];
                try{
                    if (this.claimController(room.controller) == ERR_NOT_IN_RANGE) {
                        this.moveTo(room.controller);
                    }
                }catch{
                    this.moveTo(new RoomPosition(25, 25, 'E42N21'));
                }
                return;
            }
            if(this.memory.role == 'initializer'){
                var room = Game.rooms['E42N21'];
                if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    if(this.withdraw(Game.rooms['E41N22'].storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.moveTo(Game.rooms['E41N22'].storage);
                    }
                }else{
                    try{

                        var r1 = this.build(room.find(FIND_MY_CONSTRUCTION_SITES)[0]);
                        if (r1 == ERR_NOT_IN_RANGE) {
                            this.moveTo(room.find(FIND_MY_CONSTRUCTION_SITES)[0]);
                            return;
                        }else if (r1 == ERR_INVALID_TARGET && Game.getObjectById("63950b9705a170160de01e69").getFreeCapacity > 0) {
                            var r2 = this.transfer(Game.getObjectById("63950b9705a170160de01e69"), RESOURCE_ENERGY)
                            if(r2 == ERR_NOT_IN_RANGE) {
                                this.moveTo(Game.getObjectById("63950b9705a170160de01e69"));
                                return;
                            }
                        }else{
                            if(this.upgradeController(room.controller) == ERR_NOT_IN_RANGE){
                                this.moveTo(room.controller);
                            }
                        }
                    }catch(e){
                        console.log(e.stack)
                        this.moveTo(new RoomPosition(25, 25, 'E42N21'));
                    }
                    
                }
                return;
            }
            if(this.memory.role == 'getpower'){
                try{
                    if(this.hits < this.hitsMax){
                        this.heal(this);
                    }else{
                        
                        var target = Game.getObjectById('626ad64330b5ac0dacc37169');
                        if (this.attack(target) != 0) {
                            if (this.moveTo(target) != 0){
                                this.moveTo(new RoomPosition(25, 25, 'E40N22'));
                            }
                        }
                    }
                }catch{
                    
                    this.moveTo(new RoomPosition(40, 32, 'E40N22'));
                }
                return;
            }
            if(!this.memory.task){
                return;
            }

            switch (this.memory.task.type) {
                case 'harvestpro': Behavior.harvestPro(this, this.memory.task); break;
                case 'pickup': Behavior.pickUp(this, this.memory.task); break;
                case 'delivery': Behavior.delivery(this, this.memory.task); break;
                case 'getenergy': Behavior.getenergy(this, this.memory.task); break;
                case 'repair': Behavior.repair(this, this.memory.task); break;
                case 'build': Behavior.build(this, this.memory.task); break;
                case 'upgrade': Behavior.upgrade(this, this.memory.task); break;
                case 'reserve': Behavior.reserve(this, this.memory.task); break;
                case 'guard': Behavior.guard(this, this.memory.task); break;
            }
        } else {
            // this.say('😪');
        }
    },
    reviewTask: function () {
        if (this.memory.inTask) {
            if(!this.memory.task){
                return;
            }
            switch (this.memory.task.type) {
                case 'harvestpro': break;
                case 'pickup':
                    // if already got resource from source, stop
                    if (this.store.getUsedCapacity() > 0) {
                        this.memory.inTask = false;
                        for (let i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup.splice(i, 1);
                                return;
                            }
                        }
                    }
                    // if source is empty, stop
                    var source = Game.getObjectById(this.memory.task.releaserId);
                    if(!source){
                        this.memory.inTask = false;
                        
                        for (let i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup.splice(i, 1);
                                return;
                            }
                        }
                    }
                    if(source.store && source.store.getUsedCapacity(RESOURCE_ENERGY) < 10){
                        this.memory.inTask = false;
                        for (let i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.pickup.splice(i, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'delivery':
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery.splice(i, 1);
                                return;
                            }
                        }
                    }
                    if (Game.getObjectById(this.memory.task.releaserId).store.getFreeCapacity(RESOURCE_ENERGY) < 2) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery.splice(i, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'getenergy':
                    // if already got resource from source, stop
                    if (this.store.getUsedCapacity() > 0) {
                        this.memory.inTask = false;
                        for (let i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.getenergy) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.getenergy[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.getenergy.splice(i, 1);
                                return;
                            }
                        }
                    }

                    if (Game.getObjectById(this.memory.task.releaserId).store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
                        this.memory.inTask = false;
                        for (let i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.getenergy) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.getenergy[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.getenergy.splice(i, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'repair':
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.repair) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.repair[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.repair.splice(i, 1);
                                return;
                            }
                        }
                    }
                    if(!Game.getObjectById(this.memory.task.releaserId)){
                        var finished = true;
                    }else{
                        finished = Game.getObjectById(this.memory.task.releaserId).hitsMax == Game.getObjectById(this.memory.task.releaserId).hits;
                    }
                    if (finished) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.repair) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.repair[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.repair.splice(i, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'build':
                    // if run out of energy
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.build) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.build[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.build.splice(i, 1);
                                return;
                            }
                        }
                    }
                    // if finished the task
                    var target = Game.getObjectById(this.memory.task.releaserId);
                    if(!target) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.build) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.build[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.build.splice(i, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'upgrade':
                    // if run out of energy
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.upgrade) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.upgrade[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.upgrade.splice(i, 1);
                                return;
                            }
                        }
                    }
                    break;
                case 'reverse': break;
                case 'guard': break;
                default:
                    break;
            }
        }
    },
}