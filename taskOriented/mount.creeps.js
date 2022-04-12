var Behavior = require('task.behavior');

module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}

const creepExtension = {
    acceptTask: function(){
        if(this.memory.inTask){
            return;
        }

        switch(this.memory.role){
            case 'harvesterpro':
                for(i in this.room.memory.tasks.harvesterpro){
                    if(!this.room.memory.tasks.harvesterpro[i].creepId){
                        this.room.memory.tasks.harvesterpro[i].creepId = this.id;
                        this.memory.task = this.room.memory.tasks.harvesterpro[i];
                        this.memory.inTask = true;
                    }
                }
                break;
        }
    },
    operate: function(){
        if(this.memory.inTask){
            switch(this.memory.task.type){
                case 'harvestpro': Behavior.harvestPro(this, this.memory.task); break;
            }
        }else{
            this.say('😪');
        }
    },
    reviewTask: function(){
        if(this.memory.inTask){
            switch(this.memory.task.type){
                case 'harvestpro': break;
            }
        }
    },

}