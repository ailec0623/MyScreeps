
var Creeps = {
    run: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creep.acceptTask();
            creep.operate();
            creep.reviewTask();
        }
	}
};

module.exports = Creeps;