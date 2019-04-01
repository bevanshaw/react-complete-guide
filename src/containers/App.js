import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
state = {
  persons: [
    {id: 'dadaw', name:'Bevan', age:'37'},
    {id: 'vdfvx', name:'Frida', age:'2'},
    {id: 'lklkm', name:'Carolyn', age:'36'}
  ],
  otherState: 'some value',
  showPersons: false,
  showCockpit: true
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

//Note: Must return true or false
shouldComponentUpdate(nextProps, nextState){
  console.log('[App.js] shouldComponentUpdate');
  return true;
}

getSnapshotBeforeUpdate(prevProps, prevState){
  console.log('[App.js] getSnapshotBeforeUpdate');
  return {message:'Snapshot'};
}

componentDidUpdate(prevProps, prevState, snapshot){
  console.log('[App.js] componentDidUpdate');
  
}

  render() {

    let persons = null;

    if(this.state.showPersons){
      persons = <Persons 
          persons={this.state.persons} 
          clicked={this.deletePersonHandler}
          changed={this.changedNameHandler} />;  
    }

    return (
      <div className={classes.App}>
        <button 
        onClick={() =>{
          this.setState({showCockpit:false})
          }} >
          Remove Cockpit
          </button>
        {this.state.showCockpit ? <Cockpit 
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        persons={this.state.persons}
        clicked={this.togglePersonsHandler}/> : null}
        {persons}        
      </div>      
    );
  }
}

export default App;
