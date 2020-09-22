import React, { Component } from 'react';

class FoodCard extends Component {

  state = {
    number_of_servings: ""
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
    this.props.createMealFood(this.props.meal, this.props.food, this.state.number_of_servings, this.props.history)
    this.setState({
      text: "",
    })
    console.log("adding food to meal.......")
  };



  render() {
    return (
      <div>
        <p>{this.props.food.attributes.brand_name} {this.props.food.attributes.description} - {this.props.food.attributes.calories} calories</p>

        {!!this.props.meal ?
          <form onSubmit={this.handleSubmit}>
            <label>Number of Servings: </label>
            <input
              name="number_of_servings"
              onChange={this.handleOnChange}
              value={this.state.number_of_servings}
            />

            <br />

            <input type="submit" value="Add" />

         </form>

         :

         null
       }

      </div>

    )
  }

}

export default FoodCard;
