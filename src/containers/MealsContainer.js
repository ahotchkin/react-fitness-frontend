import React, { Component } from 'react'
import { connect } from 'react-redux';

import Meals from '../components/meals/Meals'

import { getMeals } from '../actions/meals';


class MealsContainer extends Component {

  componentDidMount() {
    // this.props.loggedIn ? this.props.getExercises() : null
    // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
    this.props.getMeals()

  }

  render() {
    return (
      <div>
        {/* SHOULD ONLY SHOW DIARY FOR THE CURRENT DAY - HAVE THE OPTION TO SEARCH BY DATE */}
        <h1>I'm in the meals container</h1>
        {/*
        {console.log(this.props)}
        */}
        <Meals meals={this.props.meals} diaryId={this.props.diaryId} diaryDate={this.props.diaryDate}/>
      </div>
    );
  }
};

// receives the state of the Redux store as an argument
const mapStateToProps = state => ({
  // loggedIn: !!state.currentUser,
  // currentUser: state.currentUser,
  meals: state.meals
});


const mapDispatchToProps = {
  getMeals,
}



// the function returned from invoking connect that will now supply DiariesContainer with props included state as descriped in MSTP and actions as described in MDTP takes DiariesContainer as an argument - the whole expression is a connected DiariesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

export default connect(mapStateToProps, mapDispatchToProps)(MealsContainer);
