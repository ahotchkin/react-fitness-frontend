import React, { Component } from 'react';

class MealFoodUpdate extends Component {

  // CAN I REFACTOR AND USE THE SAME FORM FOR NEW AND UPDATE?????? WATCH GLOBETROTTER PART 11
  state = {
    number_of_servings: this.props.mealFood.attributes.number_of_servings,
    submitted: false
  };

  handleOnChange = event => {
    // is this necessary? WHAT DOES EVENT.PERSIST() DO??????
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleOnClick = event => {
    this.setState({
      submitted: true
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.updateMealFood(this.props.mealFood, this.state.number_of_servings, this.props.history)
  };

  render() {
    return(
      <div className="update-food-card">
        {/* FIGURE OUT HOW TO USE FOODCARD COMPONENT WITH PROPS THAT NEED TO BE PASSED IN INSTEAD OF COPYING CODE*/}

        <div className="nutrition-container">
          <h5>{this.props.mealFood.attributes.food.brand_name} {this.props.mealFood.attributes.food.description}</h5>
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

          {console.log("Meal is ", this.props.mealFood.attributes.meal)}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">

              <label htmlFor="number_of_servings" className="col-auto col-form-label label-fixed">Number of Servings: </label>
              <div className="input-sm col-auto">
                <input
                  type="number"
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

              <input type="submit" className="col-auto btn btn-primary-outline btn-sm btn-padding" value="Update" onClick={this.handleOnClick} />
            </div>
          </form>

          <div className="nutrition-card">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Nutrition Facts</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-font-small">
                <tr>
                  <td><b>Calories</b></td>
                  <td><b>{this.props.mealFood.attributes.food.calories * this.state.number_of_servings}</b></td>
                </tr>
                <tr>
                  <td>Total Fat</td>
                  <td>{this.props.mealFood.attributes.food.total_fat * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent">Saturated Fat</td>
                  <td>{this.props.mealFood.attributes.food.saturated_fat * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent">Polyunsaturated Fat</td>
                  <td>{this.props.mealFood.attributes.food.polyunsaturated_fat * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent">Monounsaturated Fat</td>
                  <td>{this.props.mealFood.attributes.food.monounsaturated_fat * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent"><em>Trans</em> Fat</td>
                  <td>{this.props.mealFood.attributes.food.trans_fat * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent">Monounsaturated Fat</td>
                  <td>{this.props.mealFood.attributes.food.monounsaturated_fat * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td>Cholesterol</td>
                  <td>{this.props.mealFood.attributes.food.cholesterol * this.state.number_of_servings}mg</td>
                </tr>
                <tr>
                  <td>Sodium</td>
                  <td>{this.props.mealFood.attributes.food.sodium * this.state.number_of_servings}mg</td>
                </tr>
                <tr>
                  <td>Total Carbohydrate</td>
                  <td>{this.props.mealFood.attributes.food.total_carbohydrate * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent">Dietary Fiber</td>
                  <td>{this.props.mealFood.attributes.food.dietary_fiber * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent">Total Sugars</td>
                  <td>{this.props.mealFood.attributes.food.total_sugars * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent-double">Added Sugars</td>
                  <td>{this.props.mealFood.attributes.food.added_sugars * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td className="indent-double">Sugar Alcohols</td>
                  <td>{this.props.mealFood.attributes.food.sugar_alcohols * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td>Protein</td>
                  <td>{this.props.mealFood.attributes.food.protein * this.state.number_of_servings}g</td>
                </tr>
                <tr>
                  <td>Vitamin A</td>
                  <td>{this.props.mealFood.attributes.food.vitamin_a * this.state.number_of_servings}%</td>
                </tr>
                <tr>
                  <td>Vitamin C</td>
                  <td>{this.props.mealFood.attributes.food.vitamin_c * this.state.number_of_servings}%</td>
                </tr>
                <tr>
                  <td>Vitamin D</td>
                  <td>{this.props.mealFood.attributes.food.vitamin_d * this.state.number_of_servings}%</td>
                </tr>
                <tr>
                  <td>Calcium</td>
                  <td>{this.props.mealFood.attributes.food.calcium * this.state.number_of_servings}%</td>
                </tr>
                <tr>
                  <td>Iron</td>
                  <td>{this.props.mealFood.attributes.food.iron * this.state.number_of_servings}%</td>
                </tr>
                <tr>
                  <td>Potassium</td>
                  <td>{this.props.mealFood.attributes.food.potassium * this.state.number_of_servings}mg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


      </div>
    );
  };
};

export default MealFoodUpdate;
