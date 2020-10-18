import React from 'react';

const SearchInput = props => {

  return(

    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        className="form-control"
        name="searchTerm"
        id="searchTerm"
        onChange={props.handleOnChange}
        placeholder="Search the database"
        value={props.searchTerm}
      />
      {/*
      <br />
      <input type="submit" value="Search" />
      */}
    </form>
  )

}

export default SearchInput;
