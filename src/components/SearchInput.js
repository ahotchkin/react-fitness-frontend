import React from 'react';

const SearchInput = props => {

  return(
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        name="searchTerm"
        onChange={props.handleOnChange}
        value={props.searchTerm}
      />

      <br />

      <input type="submit" value="Search" />
    </form>
  )

}

export default SearchInput;
