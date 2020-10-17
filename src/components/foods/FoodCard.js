import React, { Component } from 'react';

class FoodCard extends Component {

  state = {
    number_of_servings: 1
  };

  handleOnChange = event => {
    // is this necessary? What is happening here?

    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createMealFood(this.props.meal, this.props.food, this.state.number_of_servings, this.props.history, this.props.location)
    this.setState({
      text: "",
    })
  };

  render() {
    {console.log(this.props)}
    return (
      <div className="nutrition-container">

        <h5>{this.props.food.attributes.brand_name} {this.props.food.attributes.description}</h5>
        <table>
          <tbody>
            <tr>
              { this.props.food.attributes.servings_per_container === 1 ?
                <td>Serving size: {this.props.food.attributes.serving_size} <span>&#183;</span>  {this.props.food.attributes.servings_per_container} serving per container</td>
              :
                <td>Serving size: {this.props.food.attributes.serving_size} <span>&#183;</span>  {this.props.food.attributes.servings_per_container} servings per container</td>
              }
            </tr>
          </tbody>
        </table>

        {!!this.props.meal ?
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">

                <label htmlFor="number_of_servings" className="col-auto col-form-label label-fixed">Number of Servings: </label>
                <div className="input-sm col-auto">
                  <input
                    type="number"
                    className="form-control"
                    name="number_of_servings"
                    id="number_of_servings"
                    value={this.state.number_of_servings}
                    onChange={this.handleOnChange}
                  />
                </div>

                <input type="submit" className="col-auto btn btn-primary-outline btn-sm btn-padding" value="Add to Meal" />
              </div>
            </form>
         :
          null
        }

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
                <td><b>{this.props.food.attributes.calories * this.state.number_of_servings}</b></td>
              </tr>
              <tr>
                <td>Total Fat</td>
                <td>{this.props.food.attributes.total_fat * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent">Saturated Fat</td>
                <td>{this.props.food.attributes.saturated_fat * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent">Polyunsaturated Fat</td>
                <td>{this.props.food.attributes.polyunsaturated_fat * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent">Monounsaturated Fat</td>
                <td>{this.props.food.attributes.monounsaturated_fat * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent"><em>Trans</em> Fat</td>
                <td>{this.props.food.attributes.trans_fat * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent">Monounsaturated Fat</td>
                <td>{this.props.food.attributes.monounsaturated_fat * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td>Cholesterol</td>
                <td>{this.props.food.attributes.cholesterol * this.state.number_of_servings}mg</td>
              </tr>
              <tr>
                <td>Sodium</td>
                <td>{this.props.food.attributes.sodium * this.state.number_of_servings}mg</td>
              </tr>
              <tr>
                <td>Total Carbohydrate</td>
                <td>{this.props.food.attributes.total_carbohydrate * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent">Dietary Fiber</td>
                <td>{this.props.food.attributes.dietary_fiber * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent">Total Sugars</td>
                <td>{this.props.food.attributes.total_sugars * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent-double">Added Sugars</td>
                <td>{this.props.food.attributes.added_sugars * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td className="indent-double">Sugar Alcohols</td>
                <td>{this.props.food.attributes.sugar_alcohols * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>{this.props.food.attributes.protein * this.state.number_of_servings}g</td>
              </tr>
              <tr>
                <td>Vitamin A</td>
                <td>{this.props.food.attributes.vitamin_a * this.state.number_of_servings}%</td>
              </tr>
              <tr>
                <td>Vitamin C</td>
                <td>{this.props.food.attributes.vitamin_c * this.state.number_of_servings}%</td>
              </tr>
              <tr>
                <td>Vitamin D</td>
                <td>{this.props.food.attributes.vitamin_d * this.state.number_of_servings}%</td>
              </tr>
              <tr>
                <td>Calcium</td>
                <td>{this.props.food.attributes.calcium * this.state.number_of_servings}%</td>
              </tr>
              <tr>
                <td>Iron</td>
                <td>{this.props.food.attributes.iron * this.state.number_of_servings}%</td>
              </tr>
              <tr>
                <td>Potassium</td>
                <td>{this.props.food.attributes.potassium * this.state.number_of_servings}mg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};



export default FoodCard;
