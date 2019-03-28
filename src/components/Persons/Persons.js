import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map((personArg, index) =>{
        return <Person 
            click={() => {props.clicked(index)}}
            name={personArg.name}
            age={personArg.age}
            key={personArg.id}
            changed={(event) => props.changed(event, personArg.id)}/>
    }   );

export default persons;