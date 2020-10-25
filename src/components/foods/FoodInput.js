import React, { Component } from 'react';

class FoodInput extends Component {

  state = {
    brand_name: "",
    description: "",
    serving_size: "",
    servings_per_container: "",
    calories: "",
    total_fat: "",
    saturated_fat: "",
    polyunsaturated_fat: "",
    monounsaturated_fat: "",
    trans_fat: "",
    cholesterol: "",
    sodium: "",
    total_carbohydrate: "",
    dietary_fiber: "",
    total_sugars: "",
    added_sugars: "",
    sugar_alcohols: "",
    protein: "",
    vitamin_a: "",
    vitamin_c: "",
    vitamin_d: "",
    calcium: "",
    iron: "",
    potassium: "",
  }

  handleOnChange = event => {
    // is this necessary?
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    // set the state here by accessing props provided by mapDispatchToProps
    console.log(this.props)

    if (!!this.props.location.state) {
      this.props.createFood(this.state, this.props.location.state.mealId, this.props.history, this.props.location)
    } else {
      this.props.createFood(this.state, null, this.props.history)
    }

    this.setState({
      brand_name: "",
      description: "",
      serving_size: "",
      servings_per_container: "",
      calories: "",
      total_fat: "",
      saturated_fat: "",
      polyunsaturated_fat: "",
      monounsaturated_fat: "",
      trans_fat: "",
      cholesterol: "",
      sodium: "",
      total_carbohydrate: "",
      dietary_fiber: "",
      total_sugars: "",
      added_sugars: "",
      sugar_alcohols: "",
      protein: "",
      vitamin_a: "",
      vitamin_c: "",
      vitamin_d: "",
      calcium: "",
      iron: "",
      potassium: "",
    })
    console.log("you submitted your food!!!")
  };

  render() {
    return(
      <div className="row">
        <div className="col-lg info-container">
        <h3 className="center-align">Add Food</h3>
        <br />
        <p className="center-align"><b><em>Please Note: While not all information is required, the more information you are able to provide the better we can calculate your macro and nutrient intake.</em></b></p>
        <p className="center-align"><em>*required</em></p>
          <div className="food-form">

            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="brand_name" className="col-sm-5 col-form-label">Brand Name:* </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="brand_name"
                    id="brand_name"
                    onChange={this.handleOnChange}
                    value={this.state.brand_name}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="description" className="col-sm-5 col-form-label">Description:* </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={this.handleOnChange}
                    value={this.state.description}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="serving_size" className="col-sm-5 col-form-label">Serving Size:* </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="serving_size"
                    id="serving_size"
                    onChange={this.handleOnChange}
                    value={this.state.serving_size}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="servings_per_container" className="col-sm-5 col-form-label">Servings Per Container:* </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="servings_per_container"
                    id="servings_per_container"
                    onChange={this.handleOnChange}
                    value={this.state.servings_per_container}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="calories" className="col-sm-5 col-form-label">Calories:* </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="calories"
                    id="calories"
                    onChange={this.handleOnChange}
                    value={this.state.calories}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="total_fat" className="col-sm-5 col-form-label">Total Fat (g):* </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="total_fat"
                    id="total_fat"
                    onChange={this.handleOnChange}
                    value={this.state.total_fat}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="saturated_fat" className="col-sm-5 col-form-label">Saturated Fat (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="saturated_fat"
                    id="saturated_fat"
                    onChange={this.handleOnChange}
                    value={this.state.saturated_fat}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="polyunsaturated_fat" className="col-sm-5 col-form-label">Polyunsaturated Fat (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="polyunsaturated_fat"
                    id="polyunsaturated_fat"
                    onChange={this.handleOnChange}
                    value={this.state.polyunsaturated_fat}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="monounsaturated_fat" className="col-sm-5 col-form-label">Monounsaturated Fat (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="monounsaturated_fat"
                    id="monounsaturated_fat"
                    onChange={this.handleOnChange}
                    value={this.state.monounsaturated_fat}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="trans_fat" className="col-sm-5 col-form-label">Trans Fat (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="trans_fat"
                    id="trans_fat"
                    onChange={this.handleOnChange}
                    value={this.state.trans_fat}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="cholesterol" className="col-sm-5 col-form-label">Cholesterol (mg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="cholesterol"
                    id="cholesterol"
                    onChange={this.handleOnChange}
                    value={this.state.cholesterol}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="sodium" className="col-sm-5 col-form-label">Sodium (mg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="sodium"
                    id="sodium"
                    onChange={this.handleOnChange}
                    value={this.state.sodium}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="total_carbohydrate" className="col-sm-5 col-form-label">Total Carbohydrates (g):* </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="total_carbohydrate"
                    id="total_carbohydrate"
                    onChange={this.handleOnChange}
                    value={this.state.total_carbohydrate}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="dietary_fiber" className="col-sm-5 col-form-label">Dietary Fiber (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="dietary_fiber"
                    id="dietary_fiber"
                    onChange={this.handleOnChange}
                    value={this.state.dietary_fiber}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="total_sugars" className="col-sm-5 col-form-label">Total Sugars (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="total_sugars"
                    id="total_sugars"
                    onChange={this.handleOnChange}
                    value={this.state.total_sugars}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="added_sugars" className="col-sm-5 col-form-label">Added Sugars (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="added_sugars"
                    id="added_sugars"
                    onChange={this.handleOnChange}
                    value={this.state.added_sugars}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="sugar_alcohols" className="col-sm-5 col-form-label">Sugar Alcohols (g): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="sugar_alcohols"
                    id="sugar_alcohols"
                    onChange={this.handleOnChange}
                    value={this.state.sugar_alcohols}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="protein" className="col-sm-5 col-form-label">Protein (g):* </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="protein"
                    id="protein"
                    onChange={this.handleOnChange}
                    value={this.state.protein}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="vitamin_a" className="col-sm-5 col-form-label">Vitamin A (mcg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="vitamin_a"
                    id="vitamin_a"
                    onChange={this.handleOnChange}
                    value={this.state.vitamin_a}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="vitamin_c" className="col-sm-5 col-form-label">Vitamin C (mg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="vitamin_c"
                    id="vitamin_c"
                    onChange={this.handleOnChange}
                    value={this.state.vitamin_c}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="vitamin_d" className="col-sm-5 col-form-label">Vitamin D (mcg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="vitamin_d"
                    id="vitamin_d"
                    onChange={this.handleOnChange}
                    value={this.state.vitamin_d}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="calcium" className="col-sm-5 col-form-label">Calcium (mg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="calcium"
                    id="calcium"
                    onChange={this.handleOnChange}
                    value={this.state.calcium}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="iron" className="col-sm-5 col-form-label">Iron (mg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="iron"
                    id="iron"
                    onChange={this.handleOnChange}
                    value={this.state.iron}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="potassium" className="col-sm-5 col-form-label">Potassium (mg): </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="potassium"
                    id="potassium"
                    onChange={this.handleOnChange}
                    value={this.state.potassium}
                  />
                </div>
              </div>

              <input type="submit" className="btn btn-primary-fill" value="Add Food" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default FoodInput;
