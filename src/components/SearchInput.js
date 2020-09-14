import React, { Component } from 'react';

class SearchInput extends Component {

  state = {
    text: "",
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
    // this.props.createExercise(this.state, this.props.history)
    this.setState({
      text: "",
    })
    console.log("searching.......")
  };

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          onChange={this.handleOnChange}
          value={this.state.text}
        />

        <br />

        <input type="submit" value="Search" />
      </form>

    )
  }
}

export default SearchInput;
