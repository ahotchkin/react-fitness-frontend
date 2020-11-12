import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Foods from '../components/foods/Foods';
import FoodInput from '../components/foods/FoodInput';

import { createFood } from '../actions/foods';
import { createMealFood } from '../actions/mealFoods';

class FoodsContainer extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    this.setState({
      loaded: true
    })
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/foods/new" render={routerProps =>
            <div className="dashboard-container">
              <FoodInput createFood={this.props.createFood} userId={this.props.currentUser.id} {...routerProps} />
            </div>
          } />
          {/* Wait until component mounts before rendering so currentlyDisplayed in foods.js is populated correctly. Tried rendering both routes within one conditional, but /meals/:mealId/foods was rendering both at the same time. */}
          { !!this.state.loaded ?
            <Route exact path="/meals/:mealId/foods" render={routerProps => {
              const meal = this.props.meals.find(meal => meal.id === routerProps.match.params.mealId)
              return (
                <div className="dashboard-container">
                  <Foods foods={this.props.foods} meal={meal} createMealFood={this.props.createMealFood} currentUser={this.props.currentUser} {...routerProps} />
                </div>
              )
            }} />
          :
            null
          }

          { !!this.state.loaded ?
            <Route exact path={this.props.match.url} render={routerProps =>
              <div className="dashboard-container">
                <Foods foods={this.props.foods} createMealFood={this.props.createMealFood} currentUser={this.props.currentUser} {...routerProps} />
              </div>
            } />
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
  createFood,
  createMealFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodsContainer);
