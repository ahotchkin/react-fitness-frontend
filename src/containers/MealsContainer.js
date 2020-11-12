import React, { Component } from 'react';
import { connect } from 'react-redux';

import Meals from '../components/meals/Meals';

import { getMeals } from '../actions/meals';


class MealsContainer extends Component {

  componentDidMount() {
    this.props.getMeals()
  };

  render() {
    return (
      <div>
        <Meals meals={this.props.meals} diaryId={this.props.diaryId} />
      </div>
    );
  };
};

const mapStateToProps = state => ({
  meals: state.meals
});


const mapDispatchToProps = {
  // even though I've already called getMeals() in MainContainer.js, need to call here so meals load when user clicks "Add Diary" button
  getMeals,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsContainer);
