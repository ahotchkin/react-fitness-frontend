import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchByDate = props => {

  return (
    <DatePicker
      selected={props.startDate}
      onChange={props.handleOnChange}
    />
  );

}

export default SearchByDate