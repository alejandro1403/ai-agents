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

    getManhattanDistance(x, y) {
        return Math.abs(x - this.queso0.x) + Math.abs(y - this.queso0.y);
    }

    setup(state0) {
        this.x = state0.raton.x;
        this.y = state0.raton.y;
        this.queso0 = state0.queso;
        this.manhattan = this.getManhattanDistance(...[this.x, this.y]);
    }
    
    // choose a direction
    chooseDirV2(usedDir, update) {
        const dirs = this.perception.slice(0,4);
        let indexToDir = ["LEFT", "UP", "RIGHT", "DOWN"];
        let alreadyThere;
        let distances = {};
        let mand;

        dirs.forEach( (dir, i) => {
            if (dir === 0) {
                let coords = update[indexToDir[i]];
                mand = this.getManhattanDistance(...coords);
                alreadyThere = this.model[coords.join()];
                if (mand < this.manhattan && !alreadyThere)
                    distances[indexToDir[i]] = mand;
            }
        });
        
        if (Object.keys(distances).length >= 1) {
            this.manhattan = mand;
            return Object.keys(distances).sort((a,b) => distances[a] - distances[b])[0];
        } 

        // There are no paths that reduce manhattan distance.
        // Select less traveled path.
        let traveled = dirs.map( (dir, i) => {
            if (dir === 0)
                return this.model[update[indexToDir[i]].join()] || 0;
        });

        const lessTraveled = [...traveled].sort( (a,b) => a-b )[0];
        const whereToGo = indexToDir[traveled.indexOf(lessTraveled)]; 
        return whereToGo;
    }

    send() {
        //this.perception = [LEFT, UP, DOWN, RIGTH, SMELL, ratonx, ratony, qx, qy]
        const update = {
            "UP": [this.x, this.y - 1],
            "DOWN": [this.x, this.y + 1],
            "LEFT": [this.x - 1, this.y],
            "RIGHT": [this.x + 1, this.y]
        };

        let viewKey = this.perception.slice(0,5).join();
        let action = this.table[viewKey];
        let hash = `${this.x},${this.y}`;

        if (action) {
            // Poner un 1 en la casilla actual, o incrementar si ya habíamos pasado por ahí
            this.model[hash] = (this.model[hash] || 0 ) + 1; 

            // pick not traveled direction that reduces manhattan dist, otherwise
            // less traveled one.
            action = this.chooseDirV2(action, update);
            
            // update location
            [this.x, this.y] = update[action];
            this.manhattan = this.getManhattanDistance(...update[action]);
            return action;

        } else {
            return this.table["default"];
        }
    }

}

module.exports = CleanerAgent;
