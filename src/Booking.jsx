// Booking.jsx
import React, { useState } from "react";
import { Radio, DatePicker } from "antd";
import dayjs from "dayjs";
import "./Booking.css";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";

const Booking = ({ originStation, activeStation }) => {
  const [tripType, setTripType] = useState("Return");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [travelers, setTravelers] = useState(1);

  const handleTripTypeChange = (value) => {
    setTripType(value);
  };

  function incrementTravelers() {
    setTravelers(prev => prev + 1);
  }

  function decrementTravelers() {
    setTravelers(prev => (prev > 1 ? prev - 1 : 1));
  }

  function getDepartureDate() {
    const today = dayjs();
    const nextSaturday = today.day(6 + (today.day() === 6 ? 7 : 0));
    const defaultDepartureDate = nextSaturday.add(2, "weeks");

    return defaultDepartureDate;
  }

  function getReturnDate(departureDate) {
    if (!departureDate) {
      departureDate = getDepartureDate();
    }
    const returnDate = dayjs(departureDate).add(1, "day");
    return returnDate;
  }

  return (
    <div className="booking">
      <div className="booking-top">
          <div className = "radios">
 <Radio.Group
          defaultValue="Return"
          buttonStyle="solid"
          className="custom-radio-group"
          onChange={(e) => handleTripTypeChange(e.target.value)}
        >
          <Radio.Button value="Oneway">One-way</Radio.Button>
          <Radio.Button value="Return">Round-trip</Radio.Button>
        </Radio.Group>
          </div>

       

        <div className = "party">
        Travelers: {' '}
        <button onClick={decrementTravelers} className={`button-minus ${travelers === 1 ? 'disabled' : ''}`}>
        -
  </button>
  
        {' '}
        <span className="travelers-text">{travelers}</span> 
        {' '}
        <button onClick={incrementTravelers} className="button-plus">+</button>

        </div>
      </div>

      <div className="booking-bottom">
        <div className="date-picker">
          {tripType === "Oneway" ? (
            <DatePicker
              defaultValue={dayjs(departureDate || getDepartureDate())}
              onChange={(date) => setDepartureDate(date)}
              disabledDate={(current) =>
                current && current < dayjs().endOf("day")
              }
              format="ddd, M/D"
              className="custom-range-picker"
              suffixIcon={<CalendarOutlined />}
              allowClear={false}
            />
          ) : (
            <DatePicker.RangePicker
              value={[
                dayjs(departureDate || getDepartureDate()),
                dayjs(
                  returnDate ||
                    getReturnDate(departureDate || getDepartureDate())
                ),
              ]}
              onChange={(dates) => {
                setDepartureDate(dates[0]);
                setReturnDate(dates[1]);
              }}
              disabledDate={(current) =>
                current && current < dayjs().endOf("day")
              }
              format="ddd, M/D"
              separator="|"
              className="custom-range-picker"
              suffixIcon={<CalendarOutlined />}
              allowClear={false}
            />
          )}
        </div>
        <div className="book-button-div">
          <form
            action="https://www.amtrak.com/services/journeysearch"
            method="post"
            target="_blank"
          >
            <input type="hidden" name="wdf_origin" value={originStation.code} />
            <input
              type="hidden"
              name="wdf_destination"
              value={activeStation.code}
            />
            <input type="hidden" name="wdf_TripType" value={tripType} />
            <input
              type="hidden"
              name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[1]/departDate.date"
              value={departureDate ? departureDate.format("MM/DD/YYYY") : ""}
            />

            {tripType === "Return" && (
              <input
                type="hidden"
                name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[2]/departDate.date"
                value={returnDate ? returnDate.format("MM/DD/YYYY") : ""}
              />
            )}
            <input type="hidden" name="wdf_person_type1" value="Adult" />
            <button
              type="submit"
              className="book-button2 plausible-event-name=Book2"
            >
              <SearchOutlined /> Search on Amtrak.com
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
