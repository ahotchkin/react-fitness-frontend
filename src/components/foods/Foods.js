import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from './FoodCard';
import SearchInput from '../SearchInput'


class Foods extends Component {

  state = {
    searchTerm: "",
    currentlyDisplayed: this.props.foods,
  }

  renderFoodCards = () => {
    // return this.props.foods.map(food => <FoodCard key={food.id} food={food} meal={this.props.meal} createMealFood={this.props.createMealFood} history={this.props.history}/>)
    return this.state.currentlyDisplayed.map(food => {
      return (<FoodCard key={food.id} food={food} meal={this.props.meal} createMealFood={this.props.createMealFood} history={this.props.history} location={this.props.location}/>)
    })
  }

  handleOnChange = event => {
    // is this necessary?
    event.persist()

    let newlyDisplayed = this.props.foods.filter(food => food.attributes.brand_name.toLowerCase().includes(event.target.value.toLowerCase()) || food.attributes.description.toLowerCase().includes(event.target.value.toLowerCase()))

    this.setState({
      [event.target.name]: event.target.value,
      currentlyDisplayed: newlyDisplayed
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    //
    // this.setState({
    //   text: "",
    // })
    // console.log("searching.......")
  };


  render() {
    return (
      <div>
        <h2>Foods</h2>
        {/* props.foods is an empty array on page refresh, but is populated on login...... what is happening here*/}
        {console.log(this.props)}
        {console.log(this.state)}

        <p>Search the database for a food or add a new food</p>

        <SearchInput searchTerm={this.state.searchTerm} handleOnChange={this.handleOnChange} handleSubmit={this.handleSubmit} />
        {/*
        <form onSubmit={this.handleSubmit}>
          <input
            name="searchTerm"
            onChange={this.handleOnChange}
            value={this.state.text}
          />

          <br />

          <input type="submit" value="Search" />
        </form>
        */}

        <br />

        {!!this.props.meal ?
          <Link to={{
            pathname: "/foods/new",
            state: {
              mealId: this.props.meal.id,
              // Need to pass diary information when creating new foods, user is directed back to /meals/:mealId/foods and without diary info the added food can't be added to the correct diary
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
    )
  }
}

export default Foods;
