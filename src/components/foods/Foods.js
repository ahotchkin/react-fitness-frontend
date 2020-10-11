import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from './FoodCard';
import SearchInput from '../SearchInput';

class Foods extends Component {

  state = {
    searchTerm: "",
    currentlyDisplayed: this.props.foods
  };

  renderFoodCards = () => {
    return this.state.currentlyDisplayed.map(food => <FoodCard key={food.id} food={food} meal={this.props.meal} createMealFood={this.props.createMealFood} history={this.props.history} location={this.props.location}/>)
  };

  handleOnChange = event => {
    // is this necessary? What is happening here?
    event.persist()

    let newlyDisplayed = this.props.foods.filter(food => food.attributes.brand_name.toLowerCase().includes(event.target.value.toLowerCase()) || food.attributes.description.toLowerCase().includes(event.target.value.toLowerCase()))

    this.setState({
      [event.target.name]: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });
  };

  // GET RID OF SUBMIT BUTTON, IT'S NOT DOING ANYTHING HERE. DO I EVER USE IT?
  handleSubmit = event => {
    event.preventDefault();
  };


  render() {
    return (
      <div>
        <h2>Foods</h2>
          <p>Search the database for a food or add a new food</p>

          <SearchInput searchTerm={this.state.searchTerm} handleOnChange={this.handleOnChange} handleSubmit={this.handleSubmit} />

          <br />

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
              <button type="button">
                Add New Food
              </button>
            </Link>
            :
            <Link to="/foods/new">
              <button type="button">
                Add New Food
              </button>
            </Link>
          }

          {this.renderFoodCards()}

      </div>
    );
  };
};

export default Foods;
