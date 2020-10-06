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
      <div>
        <h4>While not all information is required, the more information you are able to provide the better we can calculate your macro and nutrient intake.</h4>
        <p>*required</p>
        <form onSubmit={this.handleSubmit}>
          <label>Brand Name:* </label>
          <input
            name="brand_name"
            onChange={this.handleOnChange}
            value={this.state.brand_name}
          />

          <br />

          <label>Description:* </label>
          <input
            name="description"
            onChange={this.handleOnChange}
            value={this.state.description}
          />

          <br />

          <label>Serving Size:* </label>
          <input
            name="serving_size"
            onChange={this.handleOnChange}
            value={this.state.serving_size}
          />

          <br />

          <label>Servings Per Container:* </label>
          <input
            name="servings_per_container"
            onChange={this.handleOnChange}
            value={this.state.servings_per_container}
          />

          <br />

          <label>Calories:* </label>
          <input
            name="calories"
            onChange={this.handleOnChange}
            value={this.state.calories}
          />

          <br />

          <label>Total Fat (g):* </label>
          <input
            name="total_fat"
            onChange={this.handleOnChange}
            value={this.state.total_fat}
          />

          <br />

          <label>Saturated Fat (g): </label>
          <input
            name="saturated_fat"
            onChange={this.handleOnChange}
            value={this.state.saturated_fat}
          />

          <br />

          <label>Polyunsaturated Fat (g): </label>
          <input
            name="polyunsaturated_fat"
            onChange={this.handleOnChange}
            value={this.state.polyunsaturated_fat}
          />

          <br />

          <label>Monounsaturated Fat (g): </label>
          <input
            name="monounsaturated_fat"
            onChange={this.handleOnChange}
            value={this.state.monounsaturated_fat}
          />

          <br />

          <label>Trans Fat (g): </label>
          <input
            name="trans_fat"
            onChange={this.handleOnChange}
            value={this.state.trans_fat}
          />

          <br />

          <label>Cholesterol (mg): </label>
          <input
            name="cholesterol"
            onChange={this.handleOnChange}
            value={this.state.cholesterol}
          />

          <br />

          <label>Sodium (mg): </label>
          <input
            name="sodium"
            onChange={this.handleOnChange}
            value={this.state.sodium}
          />

          <br />

          <label>Total Carbohydrates (g):* </label>
          <input
            name="total_carbohydrate"
            onChange={this.handleOnChange}
            value={this.state.total_carbohydrate}
          />

          <br />

          <label>Dietary Fiber (g): </label>
          <input
            name="dietary_fiber"
            onChange={this.handleOnChange}
            value={this.state.dietary_fiber}
          />

          <br />

          <label>Total Sugars (g): </label>
          <input
            name="total_sugars"
            onChange={this.handleOnChange}
            value={this.state.total_sugars}
          />

          <br />

          <label>Added Sugars (g): </label>
          <input
            name="added_sugars"
            onChange={this.handleOnChange}
            value={this.state.added_sugars}
          />

          <br />

          <label>Sugar Alcohols (g): </label>
          <input
            name="sugar_alcohols"
            onChange={this.handleOnChange}
            value={this.state.sugar_alcohols}
          />

          <br />

          <label>Protein (g):* </label>
          <input
            name="protein"
            onChange={this.handleOnChange}
            value={this.state.protein}
          />

          <br />

          <label>Vitamin A (%): </label>
          <input
            name="vitamin_a"
            onChange={this.handleOnChange}
            value={this.state.vitamin_a}
          />

          <br />

          <label>Vitamin C (%): </label>
          <input
            name="vitamin_c"
            onChange={this.handleOnChange}
            value={this.state.vitamin_c}
          />

          <br />

          <label>Vitamin D (%): </label>
          <input
            name="vitamin_d"
            onChange={this.handleOnChange}
            value={this.state.vitamin_d}
          />

          <br />

          <label>Calcium (%): </label>
          <input
            name="calcium"
            onChange={this.handleOnChange}
            value={this.state.calcium}
          />

          <br />

          <label>Iron (%): </label>
          <input
            name="iron"
            onChange={this.handleOnChange}
            value={this.state.iron}
          />

          <br />

          <label>Potassium (mg): </label>
          <input
            name="potassium"
            onChange={this.handleOnChange}
            value={this.state.potassium}
          />

          <br />

          <input type="submit" value="Add Food" />
        </form>
      </div>
    )
  }
}

export default FoodInput;
