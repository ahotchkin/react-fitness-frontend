// Do i need this container or should this all be in MealsContainer.js????

import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';

import MealFoodUpdate from '../components/mealFoods/MealFoodUpdate'

import { getMealFoods } from '../actions/mealFoods'
import { updateMealFood } from '../actions/mealFoods';


class MealFoodsContainer extends Component {

  // componentDidMount() {
  //   // this.props.loggedIn ? this.props.getExercises() : null
  //   // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
  //   this.props.getMeals()
  //
  // }

  render() {
    return (
      <div>
      <h2>I'm in the mealFoodsContainer Now</h2>



        <Switch>
          <Route exact path="/meal_foods/:mealFoodId/edit" render={props => {
            const mealFood = this.props.meals.map(meal => meal.attributes.meal_foods).flat().find(mealFood => mealFood.id === parseInt(props.match.params.mealFoodId))
            {/* Because I'm iterating through the meals arrays to get the mealFoods, mealFood is undefined until above code is completed. I need to wait to render the MealFoodUpdate component until mealFood is defined to avoid errors. */}
            {/* This could most likely be avoided by creating methods in actions/mealFoods.js to pull mealFoods directly from the database. Currently mealFoods are only accessed from the meals and foods that are being pulled from their respective databases. */}
            {/* It feels like there is a better way to do this. What is best practice here? */}
            if (!!mealFood) {
              const meal = this.props.meals.find(meal => parseInt(meal.id) === mealFood.meal_id)
              const food = meal.attributes.foods.find(food => food.id === mealFood.food_id)
              return <MealFoodUpdate mealFood={mealFood} meal={meal} food={food} updateMealFood={this.props.updateMealFood} />
            }
          }} />
        </Switch>

      </div>
    );
  }
};

const mapStateToProps = state => ({
  meals: state.meals
});


const mapDispatchToProps = {
  updateMealFood,
}



// the function returned from invoking connect that will now supply DiariesContainer with props included state as descriped in MSTP and actions as described in MDTP takes DiariesContainer as an argument - the whole expression is a connected DiariesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MealFoodsContainer));
