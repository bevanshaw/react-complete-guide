import React, {Component} from 'react';
import classes from './Person.module.css';
import Aux from '../../../hoc/Auxiliary.js';

class Person extends Component {
    state = {
        name:'',
        age:'',
    }

    render() {
        console.log('[Person.js] rendering...');

        return (
            <Aux>
                <p onClick={this.props.click}>
                    I am {this.props.name} and my age is {this.props.age} years old 
                </p>
                <p>{this.props.children}</p>
                <input 
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}
                />
            </Aux>
        );
    }
    
}

export default Person;

