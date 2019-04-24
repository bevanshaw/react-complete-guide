import React, { Component } from 'react';

import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary.js';
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      { id: 'dadaw', name: 'Bevan', age: 37 },
      { id: 'vdfvx', name: 'Frida', age: 2 },
      { id: 'lklkm', name: 'Carolyn', age: 36 }
    ],
    otherState: 'some value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  changedNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };//Getting a copy of the specifc person to change.
    // const something = {}; creates a new JavaScript object
    //...spread operator works for objects and creates a copy of the original so can be changed.
    // Alternative (older way): const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;//changing the specific person name.

    const persons = [...this.state.persons];//Getting a copy to change
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();//slice without args copies whole array
    const persons = [...this.state.persons];//more modern way of copying an array
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
    ;
  }

  //Note: Must return true or false
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[App.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot' };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate');

  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.changedNameHandler}
          isAuthenticated={this.state.authenticated}
        />);
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false })
          }} >
          Remove Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
