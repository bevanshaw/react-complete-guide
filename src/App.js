import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
state = {
  persons: [
    {id: 'dadaw', name:'Bevan', age:'37'},
    {id: 'vdfvx', name:'Frida', age:'2'},
    {id: 'lklkm', name:'Carolyn', age:'36'}
  ],
  otherState: 'some value',
  showPersons: false
}

changedNameHandler = (event, id) =>{
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });

  const person = {...this.state.persons[personIndex]};//Getting a copy of the specifc person to change.
  // const something = {}; creates a new JavaScript object
  //...spread operator works for objects and creates a copy of the original so can be changed.
  // Alternative (older way): const person = Object.assign({}, this.state.persons[personIndex]);

  person.name = event.target.value;//changing the specific person name.

  const persons = [...this.state.persons];//Getting a copy to change
  persons[personIndex] = person;

  this.setState({persons: persons});
}

deletePersonHandler = (personIndex) =>{
 // const persons = this.state.persons.slice();//slice without args copies whole array
  const persons = [...this.state.persons];//more modern way of copying an array
  persons.splice(personIndex, 1);
  this.setState({persons:persons});
}

togglePersonsHandler = () =>{
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow});
}

  render() {

    const styleButton = {
        backgroundColor: 'green',
        color: 'white',
        font: 'inherit',
        margin: '1px solid blue',
        padding: '8px',
        cursor: 'pointer',
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((personArg, index) =>{
            return <Person 
            click={() => {this.deletePersonHandler(index)}}
            name={personArg.name}
            age={personArg.age}
            key={personArg.id}
            changed={(event) => this.changedNameHandler(event, personArg.id)}/>
          })}
        </div> 
      );
      styleButton.backgroundColor = 'red';
      //styleButton.fontWeight = 'bold';
      /*USING RADIUM PACKAGE WHICH WAS REMOVED: styleButton[':hover'] = {//note square brackets because syntax instead of . when a String
        backgroundColor: 'salmon',
        color: 'black'
      }*/
    }

    let classes = [];

    if(this.state.persons.length <= 2){
      classes.push('red'); //classes = ['red'];
    }
    if(this.state.persons.length <= 1){
      //classes = ['red', 'bold'].join(' ');
      classes.push('bold'); //classes = ['red', 'bold'];
    }

    return (
      <div className="App">
        <h1>Hi, I am a React App made by Bevan</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button 
        style={styleButton}
        onClick={this.togglePersonsHandler} >Toggle Persons</button>
        {persons}        
      </div>      
    );
  }
}

export default App;
