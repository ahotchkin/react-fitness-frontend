import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MealFoodInput from '../mealFoods/MealFoodInput';
import FoodCard from './FoodCard';
import SearchInput from '../SearchInput';

class Foods extends Component {

  state = {
    searchTerm: "",
    currentlyDisplayed: this.props.foods,
    renderFoodNutrition: false,
    currentFood: {}
  };

  renderFoodNutrition = food => {
    this.setState({
      renderFoodNutrition: true,
      currentFood: food
    });
  };

  renderFoods = () => {
    let foods = []

    // conditional ensures foods display on page refresh
    if (this.state.currentlyDisplayed.length === 0 && this.state.searchTerm === "") {
      foods = this.props.foods
    } else {
      foods = this.state.currentlyDisplayed
    };

    return foods.map(food =>
      <tr key={food.id} onClick={() => this.renderFoodNutrition(food)}>
        <td>
          {food.attributes.brand_name} {food.attributes.description}
          <footer className="footer"><em>Serving: {food.attributes.serving_size}, {food.attributes.calories} calories</em></footer>
        </td>
      </tr>
    );
  };

  renderFoodCard = () => {
    if (this.state.renderFoodNutrition && !!this.props.meal) {
      return <MealFoodInput food={this.state.currentFood.attributes} foodId={this.state.currentFood.id} meal={this.props.meal} createMealFood={this.props.createMealFood} currentUser={this.props.currentUser} history={this.props.history} location={this.props.location}/>
    } else if (this.state.renderFoodNutrition) {
      return <FoodCard food={this.state.currentFood.attributes} number_of_servings={1} currentUser={this.props.currentUser} />
    } else {
      return (
        null
      )
    };
  };

  handleOnChange = event => {
    event.persist();

    let newlyDisplayed = this.props.foods.filter(food => {
      const foodFullName = food.attributes.brand_name + " " + food.attributes.description
      return (foodFullName.toLowerCase().includes(event.target.value.toLowerCase()))
    });

    this.setState({
      [event.target.name]: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });
  };

  // handleSortClick = event => {
  //   let foods = [...this.props.foods]
  //   let sortedFood = foods.sort((a, b) => {
  //     return a.attributes.brand_name.localeCompare(b.attributes.brand_name)
  //   })
  //
  //   this.setState({
  //     currentlyDisplayed: sortedFood
  //   })
  //
  // }

  render() {
    // console.log(this.props.foods)
    return (
      <div className="row">
        <div className="col-lg info-container">
          <h2>Foods</h2>
          <br />

          <div className="row">
            <div className="col-6">
              <SearchInput searchTerm={this.state.searchTerm} handleOnChange={this.handleOnChange} />
            </div>

            <div className="col-auto">
              {!!this.props.meal ?
                <Link to={{
                  pathname: "/foods/new",
                  state: {
                    mealId: this.props.meal.id,
                  }
                }}>
                  <button type="button" className="btn btn-primary-outline">
                    Add Food to Database
                  </button>
                </Link>
                :
                <Link to="/foods/new">
                  <button type="button" className="btn btn-primary-outline">
                    Add Food to Database
                  </button>
                </Link>
              }
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-sm">
              <table className="table table-hover">
                <caption>List of foods</caption>
                <tbody>
                  {this.renderFoods()}
                </tbody>
              </table>
            </div>

            <div className="col-sm">
              { !!this.state.renderFoodNutrition ?
                <div className="nutrition-container">
                  {this.renderFoodCard()}
                </div>
              :
                null
              }
            </div>

          </div>
        </div>
      </div>
    );
  };
};

export default Foods;
