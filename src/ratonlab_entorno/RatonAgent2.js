const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0,0": "UP",
            "0,0,0,1,0": "UP",
            "0,0,1,0,0": "UP",
            "0,0,1,1,0": "UP",
            "0,1,0,0,0": "LEFT",
            "0,1,0,1,0": "RIGHT",
            "0,1,1,0,0": "LEFT",
            "0,1,1,1,0": "LEFT",
            "1,0,0,0,0": "UP",
            "1,0,0,1,0": "RIGHT",
            "1,0,1,0,0": "DOWN",
            "1,0,1,1,0": "UP",
            "1,1,0,0,0": "RIGHT",
            "1,1,0,1,0": "RIGHT",
            "1,1,1,0,0": "DOWN",
            "default": "TAKE"
        };

        this.model = {};
    }
    
    // choose a direction
    chooseDir(usedDir, update) {
        const dirs = this.perception.slice(0,-1);
        let indexToDir = ["LEFT", "UP", "RIGHT", "DOWN"];
        let alreadyThere;

        for (let i = 0; i < dirs.length; i++) {
            alreadyThere = this.model[update[indexToDir[i]].join()];
            
            if (dirs[i] === 0 && !alreadyThere) {
                return indexToDir[i];
            }
        }

        // There aren't new paths, select less-traveled path.
        let traveled = dirs.map( (dir, i) => {
            if (dir === 0)
                return this.model[update[indexToDir[i]].join()];
        });

        const lessTraveled = [...traveled].sort()[0];
        const whereToGo = indexToDir[traveled.indexOf(lessTraveled)]; 
        return whereToGo;
    }
    
    setup(state0) {
        this.x = state0.x;
        this.y = state0.y;
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        const update = {
            "UP": [this.x, this.y - 1],
            "DOWN": [this.x, this.y + 1],
            "LEFT": [this.x - 1, this.y],
            "RIGHT": [this.x + 1, this.y]
        };
        
        let viewKey = this.perception.join();
        let action = this.table[viewKey];
        let hash = `${this.x},${this.y}`;

        if (action) {
            let finalAction;
            this.model[hash] = (this.model[hash] || 0 ) + 1; 
            // ¿Ya pasó por ahí?
            if (this.model[update[action].join()] >= 1) {
                // pick the first untried direction
                finalAction = this.chooseDir(action, update);
            } else {
                finalAction = this.table[viewKey];
            }
            // update location
            [this.x, this.y] = update[finalAction];
            return finalAction;
        } else {
            return this.table["default"];
        }

    }
}

module.exports = CleanerAgent;
