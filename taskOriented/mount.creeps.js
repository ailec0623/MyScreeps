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
                for (var i in this.room.memory.tasks.harvestpro) {
                    if (!this.room.memory.tasks.harvestpro[i].creepId && !this.memory.inTask) {
                        this.room.memory.tasks.harvestpro[i].creepId = this.id;
                        this.memory.task = this.room.memory.tasks.harvestpro[i];
                        this.memory.inTask = true;
                        break;
                    }
                }
                break;
            case 'carrier':
                if (this.store[RESOURCE_ENERGY] == 0) {
                    for (var i in this.room.memory.tasks.pickup) {
                        if (!this.room.memory.tasks.pickup[i].creepId && !this.memory.inTask) {
                            this.room.memory.tasks.pickup[i].creepId = this.id;
                            this.memory.task = this.room.memory.tasks.pickup[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                } else {
                    for (var i in this.room.memory.tasks.delivery) {
                        if (!this.room.memory.tasks.delivery[i].creepId && !this.memory.inTask) {
                            this.room.memory.tasks.delivery[i].creepId = this.id;
                            this.memory.task = this.room.memory.tasks.delivery[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                }
                break;
            case 'worker':
                if (this.store[RESOURCE_ENERGY] == 0) {
                    for (var i in this.room.memory.tasks.getenergy) {
                        if (!this.room.memory.tasks.getenergy[i].creepId && !this.memory.inTask) {
                            this.room.memory.tasks.getenergy[i].creepId = this.id;
                            this.memory.task = this.room.memory.tasks.getenergy[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    for (var i in this.room.memory.tasks.pickup) {
                        if (!this.room.memory.tasks.pickup[i].creepId && !this.memory.inTask) {
                            this.room.memory.tasks.pickup[i].creepId = this.id;
                            this.memory.task = this.room.memory.tasks.pickup[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                } else {
                    for (var i in this.room.memory.tasks.repair) {
                        if (!this.room.memory.tasks.repair[i].creepId && !this.memory.inTask) {
                            this.room.memory.tasks.repair[i].creepId = this.id;
                            this.memory.task = this.room.memory.tasks.repair[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    for (var i in this.room.memory.tasks.build) {
                        if (!this.room.memory.tasks.build[i].creepId && !this.memory.inTask) {
                            this.room.memory.tasks.build[i].creepId = this.id;
                            this.memory.task = this.room.memory.tasks.build[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                    for (var i in this.room.memory.tasks.upgrade) {
                        if (!this.room.memory.tasks.upgrade[i].creepId && !this.memory.inTask) {
                            this.room.memory.tasks.upgrade[i].creepId = this.id;
                            this.memory.task = this.room.memory.tasks.upgrade[i];
                            this.memory.inTask = true;
                            break;
                        }
                    }
                }
                break;
        }
    },
    operate: function () {
        if (this.memory.inTask) {
            switch (this.memory.task.type) {
                case 'harvestpro': Behavior.harvestPro(this, this.memory.task); break;
                case 'pickup': Behavior.pickUp(this, this.memory.task); break;
                case 'delivery': Behavior.delivery(this, this.memory.task); break;
                case 'getenergy': Behavior.getenergy(this, this.memory.task); break;
                case 'repair': Behavior.repair(this, this.memory.task); break;
                case 'build': Behavior.build(this, this.memory.task); break;
                case 'upgrade': Behavior.upgrade(this, this.memory.task); break;
            }
        } else {
            this.say('😪');
        }
    },
    reviewTask: function () {
        if (this.memory.inTask) {
            switch (this.memory.task.type) {
                case 'harvestpro': break;
                case 'pickup':
                    // if already got resource from source, stop
                    if (this.store.getUsedCapacity() > 0) {
                        this.memory.inTask = false;
                        for (let i in this.room.memory.tasks.pickup) {
                            if (this.room.memory.tasks.pickup[i].creepId == this.id) {
                                this.room.memory.tasks.pickup.splice(i, 1);
                                break;
                            }
                        }
                    }
                    // if source is empty, stop
                    var source = null;
                    var position = this.room.getPositionAt(this.memory.task.sourcePosition.x, this.memory.task.sourcePosition.y);
                    if (position.lookFor(LOOK_RESOURCES).length > 0) {
                        source = position.lookFor(LOOK_RESOURCES)[0];
                    } else if (position.lookFor(LOOK_STRUCTURES).length > 0) {
                        source = position.lookFor(LOOK_STRUCTURES)[0];
                        if (source.store.getUsedCapacity(RESOURCE_ENERGY) < 100) {
                            this.memory.inTask = false;
                            for (let i in this.room.memory.tasks.pickup) {
                                if (this.room.memory.tasks.pickup[i].creepId == this.id) {
                                    this.room.memory.tasks.pickup.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    } else {
                        this.memory.inTask = false;
                        for (let i in this.room.memory.tasks.pickup) {
                            if (this.room.memory.tasks.pickup[i].creepId == this.id) {
                                this.room.memory.tasks.pickup.splice(i, 1);
                                break;
                            }
                        }
                    }
                    break;
                case 'delivery':
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in this.room.memory.tasks.delivery) {
                            if (this.room.memory.tasks.delivery[i].creepId == this.id) {
                                this.room.memory.tasks.delivery.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (this.room.lookForAt(LOOK_STRUCTURES, this.memory.task.targetPosition.x, this.memory.task.targetPosition.y)[0].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                        this.memory.inTask = false;
                        for (var i in this.room.memory.tasks.delivery) {
                            if (this.room.memory.tasks.delivery[i].creepId == this.id) {
                                this.room.memory.tasks.delivery.splice(i, 1);
                                break;
                            }
                        }
                    }
                    break;
                case 'getenergy':
                    // if already got resource from source, stop
                    if (this.store.getUsedCapacity() > 0) {
                        this.memory.inTask = false;
                        console.log(1);
                        for (let i in this.room.memory.tasks.getenergy) {
                            console.log(2);
                            if (this.room.memory.tasks.getenergy[i].creepId == this.id) {
                                console.log(i);
                                this.room.memory.tasks.getenergy.splice(i, 1);
                                break;
                            }
                        }
                    }
                    var position = this.room.getPositionAt(this.memory.task.sourcePosition.x, this.memory.task.sourcePosition.y);
                    var source = position.lookFor(LOOK_STRUCTURES)[0];
                    if (source.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
                        this.memory.inTask = false;
                        for (let i in this.room.memory.tasks.getenergy) {
                            if (this.room.memory.tasks.getenergy[i].creepId == this.id) {
                                this.room.memory.tasks.getenergy.splice(i, 1);
                                break;
                            }
                        }
                    }
                    break;
                case 'repair':
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in this.room.memory.tasks.repair) {
                            if (this.room.memory.tasks.repair[i].creepId == this.id) {
                                this.room.memory.tasks.repair.splice(i, 1);
                                break;
                            }
                        }
                    }
                    var target = this.room.lookForAt(LOOK_STRUCTURES, this.memory.task.targetPosition.x, this.memory.task.targetPosition.y)[0];
                    if (target.hits == target.hitsMax) {
                        this.memory.inTask = false;
                        for (var i in this.room.memory.tasks.repair) {
                            if (this.room.memory.tasks.repair[i].creepId == this.id) {
                                this.room.memory.tasks.repair.splice(i, 1);
                                break;
                            }
                        }
                    }
                    break;
                case 'build':
                    // if run out of energy
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in this.room.memory.tasks.build) {
                            if (this.room.memory.tasks.build[i].creepId == this.id) {
                                this.room.memory.tasks.build.splice(i, 1);
                                break;
                            }
                        }
                    }
                    // if finished the task
                    var target = this.room.lookForAt(LOOK_CONSTRUCTION_SITES, this.memory.task.targetPosition.x, this.memory.task.targetPosition.y)[0];
                    if(target.length == 0) {
                        this.memory.inTask = false;
                        for (var i in this.room.memory.tasks.build) {
                            if (this.room.memory.tasks.build[i].creepId == this.id) {
                                this.room.memory.tasks.build.splice(i, 1);
                                break;
                            }
                        }
                    }
                    break;
                case 'upgrade':
                    // if run out of energy
                    if (this.store.getUsedCapacity() == 0) {
                        this.memory.inTask = false;
                        for (var i in this.room.memory.tasks.upgrade) {
                            if (this.room.memory.tasks.upgrade[i].creepId == this.id) {
                                this.room.memory.tasks.upgrade.splice(i, 1);
                                break;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    },

}