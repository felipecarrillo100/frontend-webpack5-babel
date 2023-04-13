import React from "react";
import {MultiplyByTwo} from "./MultiplyByTwo";

interface State {
    counter: number
}
class ClassComponentTest extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            counter:0
        }
    }
    render() {
        return <div style={{color: "gray"}}>
            <div>Class Component Counter 11 {MultiplyByTwo(2)}: {this.state.counter}</div>
            <button onClick={()=>this.setState({counter: this.state.counter+1})}>+</button>
            <button onClick={()=>this.setState({counter: this.state.counter-1})}>-</button>
        </div>;
    }
}

export {
    ClassComponentTest
}
