const Agent = require('../core/Agent');


var lastmove ="" //Rodent's last move, not elegant but it works
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
            "0,0,1,1,0": "LEFT",
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


    }


    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */        
    send() {
        
        switch (lastmove){              //Switch cases to block whatever direction the rodent came from
            case "RIGHT":
                this.perception[0] = 1;  
                break;
            
            case "LEFT":
                this.perception[2] = 1;
                break;
            
            case "UP":
                this.perception[3] = 1;
                break;
            
            case "DOWN":
                this.perception[1] = 1;
                break;
            default:
                console.log("Error en el envío de la instrucción");
        };
        
        let viewKey = this.perception.join();
        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;     

        if (this.table[viewKey]) {
            lastmove = this.table[viewKey];
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }

    }

}

module.exports = CleanerAgent;