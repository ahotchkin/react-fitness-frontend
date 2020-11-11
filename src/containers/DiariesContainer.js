import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { createDiary } from '../actions/diaries';

import Diaries from '../components/diaries/Diaries'

class DiariesContainer extends Component {

  state = {
    loaded: false,
  };

  componentDidMount() {
    this.setState({
      loaded: true,
    })
  }

  render() {
    return (
      <div>
        <Switch>
          { !!this.state.loaded ?
            <Route exact path={this.props.match.url} render={props =>
              <Diaries diaries={this.props.diaries} currentUser={this.props.currentUser} createDiary={this.props.createDiary} date={this.props.date} caloriesRemaining={this.props.caloriesRemaining} caloriesConsumed={this.props.caloriesConsumed} caloriesBurned={this.props.caloriesBurned} {...props} />
            } />
          :
            null
          }
        </Switch>
      </div>
    );
  }
};

// receives the state of the Redux store as an argument
// what do I need in mapStateToProps vs. mapDispatchToProps - go through all containers and review
const mapStateToProps = state => ({
  currentUser: state.currentUser,
  diaries: state.diaries,

  meals: state.meals,
  exercises: state.exercises
});


const mapDispatchToProps = {
  createDiary,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiariesContainer);
