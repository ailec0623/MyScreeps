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
                let harvestproTasks = Game.rooms[this.memory.room].memory.tasks.harvestpro;
                if(Game.rooms[this.memory.room].memory.extension){
                    for(let r in Game.rooms[this.memory.room].memory.extension){
                        try{
                            harvestproTasks = harvestproTasks.concat(Memory.rooms[Game.rooms[this.memory.room].memory.extension[r]].tasks.harvestpro);
                        }catch(e){

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
                    let pickupTasks = Game.rooms[this.memory.room].memory.tasks.pickup;
                    if(Game.rooms[this.memory.room].memory.extension){
                        for(let r in Game.rooms[this.memory.room].memory.extension){
                            try{
                                pickupTasks = pickupTasks.concat(Game.rooms[Game.rooms[this.memory.room].memory.extension[r]].memory.tasks.pickup);
                            }catch(e){
    
                            }
                        }
                    }
                    pickupTasks.sort((a,b) => {return a.priority > b.priority;});
                    for (var i in pickupTasks) {
                        if (!pickupTasks[i].creepId && !this.memory.inTask) {
                            pickupTasks[i].creepId = this.id;
                            this.memory.task = pickupTasks[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    for (var i in Game.rooms[this.memory.room].memory.tasks.getenergy) {
                        if (!Game.rooms[this.memory.room].memory.tasks.getenergy[i].creepId && !this.memory.inTask) {
                            Game.rooms[this.memory.room].memory.tasks.getenergy[i].creepId = this.id;
                            this.memory.task = Game.rooms[this.memory.room].memory.tasks.getenergy[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                } else {
                    
                    Game.rooms[this.memory.room].memory.tasks.delivery.sort((a,b) => {return a.priority > b.priority;});
                    for (var i in Game.rooms[this.memory.room].memory.tasks.delivery) {
                        if (!Game.rooms[this.memory.room].memory.tasks.delivery[i].creepId && !this.memory.inTask) {
                            Game.rooms[this.memory.room].memory.tasks.delivery[i].creepId = this.id;
                            this.memory.task = Game.rooms[this.memory.room].memory.tasks.delivery[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                }
                break;
            case 'worker':
                if (this.store[RESOURCE_ENERGY] == 0) {
                    for (var i in Game.rooms[this.memory.room].memory.tasks.getenergy) {
                        if (!Game.rooms[this.memory.room].memory.tasks.getenergy[i].creepId && !this.memory.inTask) {
                            Game.rooms[this.memory.room].memory.tasks.getenergy[i].creepId = this.id;
                            this.memory.task = Game.rooms[this.memory.room].memory.tasks.getenergy[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    for (var i in Game.rooms[this.memory.room].memory.tasks.pickup) {
                        if (!Game.rooms[this.memory.room].memory.tasks.pickup[i].creepId && !this.memory.inTask) {
                            Game.rooms[this.memory.room].memory.tasks.pickup[i].creepId = this.id;
                            this.memory.task = Game.rooms[this.memory.room].memory.tasks.pickup[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                } else {
                    let repairTasks = Game.rooms[this.memory.room].memory.tasks.repair;
                    if(Game.rooms[this.memory.room].memory.extension){
                        for(let r in Game.rooms[this.memory.room].memory.extension){
                            try{
                                repairTasks = repairTasks.concat(Game.rooms[Game.rooms[this.memory.room].memory.extension[r]].memory.tasks.repair);
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
                    
                    let buildTasks = Game.rooms[this.memory.room].memory.tasks.build;
                    if(Game.rooms[this.memory.room].memory.extension){
                        for(let r in Game.rooms[this.memory.room].memory.extension){
                            try{
                                buildTasks = buildTasks.concat(Game.rooms[Game.rooms[this.memory.room].memory.extension[r]].memory.tasks.build);
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
                    
                    for (var i in Game.rooms[this.memory.room].memory.tasks.upgrade) {
                        if (!Game.rooms[this.memory.room].memory.tasks.upgrade[i].creepId && !this.memory.inTask) {
                            Game.rooms[this.memory.room].memory.tasks.upgrade[i].creepId = this.id;
                            this.memory.task = Game.rooms[this.memory.room].memory.tasks.upgrade[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                }
                break;
            case 'reserver':
                let reserveTasks = [];
                if(Game.rooms[this.memory.room].memory.extension){
                    for(let r in Game.rooms[this.memory.room].memory.extension){
                        try{
                            reserveTasks = reserveTasks.concat(Memory.rooms[Game.rooms[this.memory.room].memory.extension[r]].tasks.reserve);
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
                if(Game.rooms[this.memory.room].memory.extension){
                    for(let r in Game.rooms[this.memory.room].memory.extension){
                        try{
                            guardTasks = guardTasks.concat(Memory.rooms[Game.rooms[this.memory.room].memory.extension[r]].tasks.guard);
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
        }
    },
    operate: function () {
        if(this.spawning){
            return;
        }
        if (this.memory.inTask) {
            // if(this.memory.role == 'm'){
            //     this.moveTo(new RoomPosition(46, 3, 'E41N23'));
            //     return;
            // }
            // if(this.memory.role == 'a'){
            //     if(this.attack(Game.getObjectById('625f953b9e00394955b0817c')) == ERR_NOT_IN_RANGE){
            //         this.moveTo(Game.getObjectById('625f953b9e00394955b0817c'));
            //     }
            // }
            // if(this.memory.role == 'claimer'){
            //     var room = Game.rooms['E41N22'];
            //     try{
            //         if (this.claimController(room.controller) == ERR_NOT_IN_RANGE) {
            //             this.moveTo(room.controller);
            //         }
            //     }catch{
            //         this.moveTo(new RoomPosition(25, 25, 'E41N22'));
            //     }
            //     return;
            // }
            // if(this.memory.role == 'initializer'){
            //     var room = Game.rooms['E41N22'];
            //     if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            //         if(this.withdraw(Game.rooms['E41N24'].storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //             this.moveTo(Game.rooms['E41N24'].storage);
            //         }
            //     }else{
            //         try{
            //             if (this.build(room.find(FIND_MY_CONSTRUCTION_SITES)[0]) == ERR_NOT_IN_RANGE) {
            //                 this.moveTo(room.find(FIND_MY_CONSTRUCTION_SITES)[0]);
            //             }
            //         }catch{
            //             this.moveTo(new RoomPosition(25, 25, 'E41N22'));
            //         }
            //     }
            //     return;
            // }
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
            this.say('😪');
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
                    if (this.store.getUsedCapacity() < 30) {
                        this.memory.inTask = false;
                        for (var i in Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery) {
                            if (Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery[i].creepId == this.id) {
                                Memory.rooms[this.memory.task.targetPosition.roomName].tasks.delivery.splice(i, 1);
                                return;
                            }
                        }
                    }
                    if (Game.getObjectById(this.memory.task.releaserId).store.getFreeCapacity(RESOURCE_ENERGY) < 10) {
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