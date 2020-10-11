import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Foods from '../components/foods/Foods';
import FoodInput from '../components/foods/FoodInput';


import { getFoods } from '../actions/foods';
// add getMeals to mapDispatchToProps and call in componentDidMount to ensure meals are in state on page refresh
import { getMeals } from '../actions/meals';
import { createFood } from '../actions/foods';
import { createMealFood } from '../actions/mealFoods';

class FoodsContainer extends Component {

  componentDidMount() {
    this.props.getFoods()
    this.props.getMeals()
  };

  render() {
    return (
      <div>
        <h1>I'm in the foods container</h1>
        <Switch>
          <Route exact path="/foods/new" render={props => <FoodInput createFood={this.props.createFood} {...props} /> } />

          {/* Wait until foods array is populated before rendering so currentlyDisplayed in foods.js is populated correctly. Tried rendering both routes within one conditional, but /meals/:mealId/foods was rendering both at the same time. */}
          { this.props.foods.length > 0 ?
            <Route exact path="/meals/:mealId/foods" render={props => {
              const meal = this.props.meals.find(meal => meal.id === props.match.params.mealId)
              return <Foods foods={this.props.foods} meal={meal} createMealFood={this.props.createMealFood} {...props} />
            }} />
          :
            null
          }

          { this.props.foods.length > 0 ?
            <Route exact path={this.props.match.url} render={props => <Foods foods={this.props.foods} createMealFood={this.props.createMealFood} {...props} />} />
          :
            null
          }

        </Switch>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  foods: state.foods,
  meals: state.meals
});


const mapDispatchToProps = {
  getFoods,
  getMeals,
  createFood,
  createMealFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodsContainer);
