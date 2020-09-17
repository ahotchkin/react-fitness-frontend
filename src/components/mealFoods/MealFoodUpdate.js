import React, { Component } from 'react';

class MealFoodUpdate extends Component {

  // CAN I REFACTOR AND USE THE SAME FORM FOR NEW AND UPDATE?????? WATCH GLOBETROTTER PART 11
  state = {
    number_of_servings: this.props.mealFood.attributes.number_of_servings,
  }

  handleOnChange = event => {
    // is this necessary? WHAT DOES EVENT.PERSIST() DO??????
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    // set the state here by accessing props provided by mapDispatchToProps
    console.log(this.props)

    // IS IT NOT NECESSARY TO PASS IN THE CURRENT USER BECAUSE ONLY THE FIELDS DECLARED IN THE ACTION WILL BE UPDATED?????????????
    this.props.updateMealFood(this.props.mealFood, this.props.mealFood.attributes.food, this.state.number_of_servings, this.props.history)
    this.setState({
      // drop down stays selected on whatever category was selected. Is this a problem or will it always update on page refresh?
      number_of_servings: "",
    })
    console.log("you updated your mealFood!!!")
  };




  render() {
    return(
      <div>
      {console.log(this.props)}

      <h1>Let's get ready to update!!!</h1>

        <p>This is the MEALFOOD UPDATE page for mealFood with an ID of {this.props.mealFood.id}.</p>

        <p>Meal is {this.props.mealFood.attributes.meal.category}</p>
        <p>Food is {this.props.mealFood.attributes.food.brand_name}</p>
        {/* BREAK THIS OUT INTO SEPARATE COMPONENT TO USE HERE AND IN FOODCARD.JS */}

        <form onSubmit={this.handleSubmit}>
          <label>Number of Servings: </label>
          <input
            name="number_of_servings"
            onChange={this.handleOnChange}
            value={this.state.number_of_servings}
          />

          <br /><br />

          <input type="submit" value="Update" />

        </form>

      </div>
    )
  }
}

export default MealFoodUpdate;
