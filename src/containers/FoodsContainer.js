import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';


import Foods from '../components/foods/Foods'
import FoodInput from '../components/foods/FoodInput'


import { getFoods } from '../actions/foods';
import { createFood } from '../actions/foods';

// add getMeals to mapDispatchToProps and call in componentDidMount to ensure meals are in state on page refresh
import { getMeals } from '../actions/meals'
import { createMealFood } from '../actions/mealFoods'

class FoodsContainer extends Component {

  componentDidMount() {
    // this.props.loggedIn ? this.props.getExercises() : null
    // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
    this.props.getFoods()
    this.props.getMeals()
  }

  render() {
    return (
      <div>
        <h1>I'm in the foods container</h1>
        {console.log(`I'm console logging props at ${new Date()}: `, this.props)}
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
  }
};

// receives the state of the Redux store as an argument
const mapStateToProps = state => ({
  // loggedIn: !!state.currentUser,
  // currentUser: state.currentUser,
  foods: state.foods,
  meals: state.meals
});


const mapDispatchToProps = {
  getFoods,
  getMeals,
  createFood,
  createMealFood,
}



// the function returned from invoking connect that will now supply DiariesContainer with props included state as descriped in MSTP and actions as described in MDTP takes DiariesContainer as an argument - the whole expression is a connected DiariesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

export default connect(mapStateToProps, mapDispatchToProps)(FoodsContainer);
