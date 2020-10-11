import React, { Component } from 'react';

class FoodCard extends Component {

  state = {
    number_of_servings: ""
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
    );
  };
};

export default FoodCard;
