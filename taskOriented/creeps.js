
var Creeps = {
    run: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            try{
                creep.acceptTask();
                creep.operate();
                creep.reviewTask();
            }catch(error){
                console.log('Creeps error')
                console.log(error.stack)
            }

        }
	}
};

module.exports = Creeps;