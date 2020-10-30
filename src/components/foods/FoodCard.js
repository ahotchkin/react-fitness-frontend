import React, { Component } from 'react';

class FoodCard extends Component {

  state = {
    number_of_servings: 1,
    submitted: false
  };

  handleOnChange = event => {
    // is this necessary? What is happening here?

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
    this.props.createMealFood(this.props.meal, this.props.food, this.state.number_of_servings, this.props.history, this.props.location)
  };

  render() {
    console.log(this.props)
    return (
      <div className="nutrition-container">
        <h5>{this.props.food.attributes.brand_name} {this.props.food.attributes.description} Nutrition</h5>
        <table className="bottom-margin">
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
         :
          null
        }

        {console.log(this.props.currentUser.attributes.daily_fat_goal)}
        <div className="nutrition-card">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Calories</th>
                <th className="right-align">{Math.round(this.props.food.attributes.calories * this.state.number_of_servings)}</th>
              </tr>
            </thead>
            <tbody className="table-font-small">
              <tr className="table-font-extra-small">
                <td></td>
                <td className="right-align"><b>% Daily Value</b></td>
              </tr>
              <tr>
                <td><b>Total Fat</b> {Math.round(this.props.food.attributes.total_fat * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.total_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_fat_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.total_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_fat_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.total_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_fat_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td className="indent">Saturated Fat {Math.round(this.props.food.attributes.saturated_fat * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.saturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_saturated_fat_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.saturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_saturated_fat_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.saturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_saturated_fat_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td className="indent">Polyunsaturated Fat {Math.round(this.props.food.attributes.polyunsaturated_fat * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.polyunsaturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_polyunsaturated_fat_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.polyunsaturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_polyunsaturated_fat_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.polyunsaturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_polyunsaturated_fat_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td className="indent">Monounsaturated Fat {Math.round(this.props.food.attributes.monounsaturated_fat * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.monounsaturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_monounsaturated_fat_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.monounsaturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_monounsaturated_fat_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.monounsaturated_fat * this.state.number_of_servings) / this.props.currentUser.attributes.daily_monounsaturated_fat_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td className="indent"><em>Trans</em> Fat {Math.round(this.props.food.attributes.trans_fat * this.state.number_of_servings)}g</td>
                <td></td>

                {/*
                <td><b>
                  { this.props.food.attributes.trans_fat > 0
                    100%
                  :
                    0%
                  }
                </b></td>
                */}
              </tr>
              <tr>
                <td><b>Cholesterol</b> {Math.round(this.props.food.attributes.cholesterol * this.state.number_of_servings)}mg</td>
                { Math.round(((this.props.food.attributes.cholesterol * this.state.number_of_servings) / this.props.currentUser.attributes.daily_cholesterol_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.cholesterol * this.state.number_of_servings) / this.props.currentUser.attributes.daily_cholesterol_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.cholesterol * this.state.number_of_servings) / this.props.currentUser.attributes.daily_cholesterol_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td><b>Sodium</b> {Math.round(this.props.food.attributes.sodium * this.state.number_of_servings)}mg</td>
                { Math.round(((this.props.food.attributes.sodium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_sodium_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.sodium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_sodium_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.sodium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_sodium_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td><b>Total Carbohydrate</b> {Math.round(this.props.food.attributes.total_carbohydrate * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.total_carbohydrate * this.state.number_of_servings) / this.props.currentUser.attributes.daily_carbohydrate_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.total_carbohydrate * this.state.number_of_servings) / this.props.currentUser.attributes.daily_carbohydrate_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.total_carbohydrate * this.state.number_of_servings) / this.props.currentUser.attributes.daily_carbohydrate_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td className="indent">Dietary Fiber {Math.round(this.props.food.attributes.dietary_fiber * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.dietary_fiber * this.state.number_of_servings) / this.props.currentUser.attributes.daily_fiber_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.dietary_fiber * this.state.number_of_servings) / this.props.currentUser.attributes.daily_fiber_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.dietary_fiber * this.state.number_of_servings) / this.props.currentUser.attributes.daily_fiber_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td className="indent">Total Sugars {Math.round(this.props.food.attributes.total_sugars * this.state.number_of_servings)}g</td>
                <td></td>
              </tr>
              <tr>
                <td className="indent-double">Added Sugars {Math.round(this.props.food.attributes.added_sugars * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.added_sugars * this.state.number_of_servings) / this.props.currentUser.attributes.daily_sugar_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.added_sugars * this.state.number_of_servings) / this.props.currentUser.attributes.daily_sugar_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.added_sugars * this.state.number_of_servings) / this.props.currentUser.attributes.daily_sugar_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td className="indent-double">Sugar Alcohols {Math.round(this.props.food.attributes.sugar_alcohols * this.state.number_of_servings)}g</td>
                <td></td>
              </tr>
              <tr>
                <td><b>Protein</b> {Math.round(this.props.food.attributes.protein * this.state.number_of_servings)}g</td>
                { Math.round(((this.props.food.attributes.protein * this.state.number_of_servings) / this.props.currentUser.attributes.daily_protein_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.protein * this.state.number_of_servings) / this.props.currentUser.attributes.daily_protein_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.protein * this.state.number_of_servings) / this.props.currentUser.attributes.daily_protein_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td>Vitamin A {Math.round(this.props.food.attributes.vitamin_a * this.state.number_of_servings)}mcg</td>
                { Math.round(((this.props.food.attributes.vitamin_a * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_a_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.vitamin_a * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_a_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.vitamin_a * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_a_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td>Vitamin C {Math.round(this.props.food.attributes.vitamin_c * this.state.number_of_servings)}mg</td>
                { Math.round(((this.props.food.attributes.vitamin_c * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_c_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.vitamin_c * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_c_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.vitamin_c *   this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_c_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td>Vitamin D {Math.round(this.props.food.attributes.vitamin_d * this.state.number_of_servings)}mcg</td>
                { Math.round(((this.props.food.attributes.vitamin_d * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_d_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.vitamin_d * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_d_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.vitamin_d * this.state.number_of_servings) / this.props.currentUser.attributes.daily_vitamin_d_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td>Calcium {Math.round(this.props.food.attributes.calcium * this.state.number_of_servings)}mg</td>
                { Math.round(((this.props.food.attributes.calcium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_calcium_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.calcium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_calcium_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.calcium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_calcium_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td>Iron {Math.round(this.props.food.attributes.iron * this.state.number_of_servings)}mg</td>
                { Math.round(((this.props.food.attributes.iron * this.state.number_of_servings) / this.props.currentUser.attributes.daily_iron_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.iron * this.state.number_of_servings) / this.props.currentUser.attributes.daily_iron_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.iron * this.state.number_of_servings) / this.props.currentUser.attributes.daily_iron_goal) * 100)}%</b></td>
                }
              </tr>
              <tr>
                <td>Potassium {Math.round(this.props.food.attributes.potassium * this.state.number_of_servings)}mg</td>
                { Math.round(((this.props.food.attributes.potassium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_potassium_goal) * 100) > 100 ?
                  <td className="right-align negative"><b>{Math.round(((this.props.food.attributes.potassium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_potassium_goal) * 100)}%</b></td>
                :
                  <td className="right-align"><b>{Math.round(((this.props.food.attributes.potassium * this.state.number_of_servings) / this.props.currentUser.attributes.daily_potassium_goal) * 100)}%</b></td>
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};



export default FoodCard;
