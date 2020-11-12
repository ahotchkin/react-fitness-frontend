import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchByDate = props => {
  return (
    <div className="datepicker-container">
      <div className="col-lg">
        <div className="row">
            <div className="col-auto">
              <h3>{props.header}</h3>
            </div>
            <div className="col-sm-3">
              <DatePicker
              todayButton="Today"
              selected={props.startDate}
              onChange={props.handleOnChange}
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default SearchByDate;
