import React, { Component } from 'react';
import FoodCard from '../foods/FoodCard';

class MealFoodUpdate extends Component {

  // CAN I REFACTOR AND USE THE SAME FORM FOR NEW AND UPDATE??????
  state = {
    number_of_servings: this.props.mealFood.attributes.number_of_servings,
    submitted: false
  };

  handleOnChange = event => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnClick = event => {
    event.persist();
    this.setState({
      submitted: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateMealFood(this.props.mealFood, this.state.number_of_servings, this.props.history);
  };

  render() {
    return(
      <div className="update-food-card">
        <div className="nutrition-container">
          <h5>{this.props.mealFood.attributes.food.brand_name} {this.props.mealFood.attributes.food.description} Nutrition</h5>
          <table className="bottom-margin">
            <tbody>
              <tr>
                { this.props.mealFood.attributes.food.servings_per_container === 1 ?
                  <td>Serving size: {this.props.mealFood.attributes.food.serving_size} <span>&#183;</span>  {this.props.mealFood.attributes.food.servings_per_container} serving per container</td>
                :
                  <td>Serving size: {this.props.mealFood.attributes.food.serving_size} <span>&#183;</span>  {this.props.mealFood.attributes.food.servings_per_container} servings per container</td>
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

          <FoodCard food={this.props.mealFood.attributes} mealCheck={this.props.mealFood} number_of_servings={this.state.number_of_servings} currentUser={this.props.currentUser} />
        </div>
      </div>
    );
  };
};

export default MealFoodUpdate;
