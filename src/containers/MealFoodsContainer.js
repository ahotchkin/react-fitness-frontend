import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import MealFoods from '../components/mealFoods/MealFoods';
import MealFoodUpdate from '../components/mealFoods/MealFoodUpdate';

import { getMealFoods } from '../actions/mealFoods';
import { updateMealFood } from '../actions/mealFoods';
import { deleteMealFood } from '../actions/mealFoods';

class MealFoodsContainer extends Component {

  componentDidMount() {
    this.props.getMealFoods()
  };

  render() {
    return (
      <div>
        <Switch>

          {/* Need to pass meal as prop to mealFoods to have access to it in MealFoodCard to pass to deleteMealFood. Can access meal from mealFood, however when doing this in deleteMealFood meal.calories is not always updated appropriately. Passing in the meal itself seems to solve this problem. */}
          <Route exact path="/diaries" render={routerProps => <MealFoods mealFoods={this.props.mealFoods.filter(mealFood => mealFood.relationships.meal.data.id === this.props.meal.id)} meal={this.props.meal} deleteMealFood={this.props.deleteMealFood} {...routerProps} /> } />

          <Route exact path="/meal_foods/:mealFoodId/edit" render={routerProps => {
            const mealFood = this.props.mealFoods.find(mealFood => mealFood.id === routerProps.match.params.mealFoodId)
            if (!!mealFood) {
              return <MealFoodUpdate mealFood={mealFood} updateMealFood={this.props.updateMealFood} currentUser={this.props.currentUser} {...routerProps} />
            }
          }} />


        </Switch>

      </div>
    );
  };
};

const mapStateToProps = state => ({
  mealFoods: state.mealFoods,
});


const mapDispatchToProps = {
  getMealFoods,
  updateMealFood,
  deleteMealFood
};

export default connect(mapStateToProps, mapDispatchToProps)(MealFoodsContainer);
