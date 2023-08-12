var Releaser = require('task.releaser');

var ConstructionSite = {
    run: function(){
        for(let i in Game.constructionSites){
            var room = Game.constructionSites[i].room;
            if(room){
                var haveTask = 0;
                for (let t in room.memory.tasks.build) {
                    if (room.memory.tasks.build[t].releaserId == Game.constructionSites[i].id) {
                        haveTask += 1;
                    }
                }
                if (haveTask > 2) {
                    continue;
                } else {
                    Releaser.releaseTask(room, 'build', Game.constructionSites[i].pos, Game.constructionSites[i].pos, Game.constructionSites[i].id, 1, null);
                }
            }
        }
    }
}
module.exports = ConstructionSite;