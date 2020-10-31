import React, { Component } from 'react'
import { connect } from 'react-redux';

import Meals from '../components/meals/Meals'

import { getMeals } from '../actions/meals';


class MealsContainer extends Component {

  componentDidMount() {
    this.props.getMeals()
  }

  render() {
    return (
      <div>
        <Meals meals={this.props.meals} diaryId={this.props.diaryId} diaryDate={this.props.diaryDate}/>
      </div>
    );
  }
};

// receives the state of the Redux store as an argument
const mapStateToProps = state => ({
  meals: state.meals
});


const mapDispatchToProps = {
  // even though I've already called getMeals() in MainContainer.js, need to call here so meals load when user clicks "Add Diary" button
  getMeals,
}



// the function returned from invoking connect that will now supply DiariesContainer with props included state as descriped in MSTP and actions as described in MDTP takes DiariesContainer as an argument - the whole expression is a connected DiariesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

export default connect(mapStateToProps, mapDispatchToProps)(MealsContainer);
