import React from 'react';
import { connect } from 'react-redux';



const MainContainer = ({ currentUser }) => {
  return (
    <div className="MainContainer">

      { currentUser ? <h2>Hello, {currentUser.attributes.username}! Welcome to the Main Container of React Fitness!</h2> : "" }

    </div>
  )
}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(MainContainer);
