import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
    // static getDerivedStateFromProps(props, state){
    //     console.log('{Persons.js] getDerivedStateFromProps');
    //     return this.state;
    // }

    //Note: Must return true or false
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    // getSnapshotBeforeUpdate(prevProps, prevState){
    //     console.log('[Persons.js] getSnapshotBeforeUpdate');
    //     return {message:'Snapshot'};
    // }

    componentDidUpdate(prevProps, prevState, Snapshot){
        console.log('[Persons.js] componentDidUpdate');
        console.log(Snapshot);
        return this.props.message;
    }

    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Person.js] rendering...')
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    click={() => { this.props.clicked(index) }}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.props.changed(event, person.id)} 
                />
            );
        });
    }
}

export default Persons;