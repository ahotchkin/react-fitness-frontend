import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from './FoodCard';
import SearchInput from '../SearchInput';
// import FoodNutritionCard from './FoodNutritionCard';


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
    })
  }

  // renderFoodCards = () => {
  //   return this.state.currentlyDisplayed.map(food => <FoodCard key={food.id} food={food} meal={this.props.meal} createMealFood={this.props.createMealFood} history={this.props.history} location={this.props.location} renderFoodNutrition={this.renderFoodNutrition} />)
  // };

  renderFoods = () => {
    let foods = []

    // conditional ensures foods display on page refresh
    if (this.state.currentlyDisplayed.length === 0 && this.state.searchTerm === "") {
      foods = this.props.foods
    } else {
      foods = this.state.currentlyDisplayed
    }

    return foods.map(food =>
      <tr key={food.id} onClick={() => this.renderFoodNutrition(food)}>
        <td>
          {food.attributes.brand_name} {food.attributes.description}
          <footer className="footer"><em>Serving: {food.attributes.serving_size}, {food.attributes.calories} calories</em></footer>
        </td>
      </tr>
    )
  }

  handleOnChange = event => {
    // is this necessary? What is happening here?
    event.persist()

    let newlyDisplayed = this.props.foods.filter(food => {
      const foodFullName = food.attributes.brand_name + " " + food.attributes.description
      return (foodFullName.toLowerCase().includes(event.target.value.toLowerCase()))
    })

    this.setState({
      [event.target.name]: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });

  };

  // GET RID OF SUBMIT BUTTON, IT'S NOT DOING ANYTHING HERE. DO I EVER USE IT?
  // handleSubmit = event => {
  //   event.preventDefault();
  // };

  render() {
    console.log(this.state)
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
                    // Need to pass diary information when creating new foods, user is directed back to /meals/:mealId/foods and without diary info the newly added food can't be added to the correct diary
                    diaryId: this.props.location.state.diaryId,
                    diaryDate: this.props.location.state.diaryDate
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
              { this.state.renderFoodNutrition ?
                <FoodCard food={this.state.currentFood} meal={this.props.meal} createMealFood={this.props.createMealFood} history={this.props.history} location={this.props.location} />
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
