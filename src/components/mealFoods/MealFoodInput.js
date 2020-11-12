import React, { Component } from 'react';
import FoodCard from '../foods/FoodCard';

class MealFoodInput extends Component {

  // CAN I REFACTOR AND USE THE SAME FORM FOR NEW AND UPDATE?????? WATCH GLOBETROTTER PART 11
  state = {
    number_of_servings: 1,
    submitted: false
  };

  handleOnChange = event => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnClick = event => {
    this.setState({
      submitted: true,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createMealFood(this.props.meal, this.props.foodId, this.props.food, this.state.number_of_servings, this.props.history, this.props.location);
  };


  render() {
    return(
      <div>
        <h5>{this.props.food.brand_name} {this.props.food.description} Nutrition</h5>
        <table className="bottom-margin">
          <tbody>
            <tr>
              { this.props.food.servings_per_container === 1 ?
                <td>Serving size: {this.props.food.serving_size} <span>&#183;</span>  {this.props.food.servings_per_container} serving per container</td>
              :
                <td>Serving size: {this.props.food.serving_size} <span>&#183;</span>  {this.props.food.servings_per_container} servings per container</td>
              }
            </tr>
          </tbody>
        </table>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">

            <label htmlFor="number_of_servings" className="col-auto col-form-label label-fixed">Number of Servings: </label>
            <div className="input-sm col-auto">
              <input
                type="number"
                min="0"
                step="any"
                className={`form-control ${!!this.state.submitted && parseInt(this.state.number_of_servings) <= 0 ? "is-invalid" : null}`}
                name="number_of_servings"
                id="number_of_servings"
                onChange={this.handleOnChange}
                value={this.state.number_of_servings}
              />
              <div className="invalid-feedback">
                Must be more than 0
              </div>
            </div>

            <input type="submit" className="col-auto btn btn-primary-outline btn-sm btn-padding" value="Add to Meal" onClick={this.handleOnClick} />
          </div>
        </form>

        <FoodCard food={this.props.food} mealCheck={this.props.meal} number_of_servings={this.state.number_of_servings} currentUser={this.props.currentUser} />
      </div>
    );
  };
};

export default MealFoodInput;
