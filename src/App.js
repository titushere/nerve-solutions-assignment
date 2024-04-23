import './App.css';
import React, { useState } from 'react';
import { dateArray, strategyArray } from './utils/utils';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function App() {

  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [selectedToggle, setSelectedToggle] = useState('Bearish');
  const [showOptions, setShowOptions] = useState(false);
  
  const handleToggleChange = (toggle) => {
    setSelectedToggle(toggle);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowOptions(false);
  };

  const filteredStrategies = strategyArray.filter(
    (item) => item.Value[selectedDate] && item.View === selectedToggle
  );

  const renderCards = () => {
    if (filteredStrategies.length === 0) {
      return <div className="no-strategies">There are no strategies for <br/><br /><span className="boldtext">{selectedDate}</span></div>;
    }

    return filteredStrategies.map((item, index) => (
      <div key={index} className="strategy-card">
        {
          Object.entries(
            item.Value[selectedDate].reduce((acc, val) => {
              acc[val] = (acc[val] || 0) + 1;
              return acc;
            }, {})
          ).map(([strategy, count]) => (
            <div key={strategy} className="strategy-info">
              <span>{strategy}</span>
              <span className="endtext"><li>{count} {count === 1 ? 'Strategy' : 'Strategies'}</li></span>
            </div>
          ))
        }
      </div>
    ));
  };

  
  return (
    <div className="button-container">
      <div className="toggle-buttons">
        {['Bullish', 'Bearish', 'Rangebound', 'Volatile'].map((toggle) => (
          <button
            key={toggle}
            className={`toggle-button ${selectedToggle === toggle ? 'active' : ''}`}
            onClick={() => handleToggleChange(toggle)}
          >
            {toggle}
          </button>
        ))}
      </div>

      <div className="date-dropdown-container">
        <div
          className="date-dropdown"
          onClick={() => setShowOptions(!showOptions)}
        >
          <span>{selectedDate}</span>
          <span className="arrow-icon">{showOptions ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
        </div>

        {showOptions && (
          <div className="date-options">
            {dateArray.map((date) => (
              <div
                key={date}
                className={`date-option ${date === selectedDate ? 'active' : ''}`}
                onClick={() => handleDateChange(date)}
              >
                {date}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="strategy-cards">
        {renderCards()}
      </div>
    </div>
  );
}

export default App;
