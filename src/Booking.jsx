// Booking.jsx
import React, { useState } from "react";
import { Radio, DatePicker } from "antd";
import dayjs from "dayjs";
import "./Booking.css";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";

const Booking = ({ originStation, activeStation, isMobile }) => {
  const [tripType, setTripType] = useState("Return");
  const [departureDate, setDepartureDate] = useState(getDepartureDate());
  const [returnDate, setReturnDate] = useState(getReturnDate());
  const [travelers, setTravelers] = useState(1);

  const handleTripTypeChange = (value) => {
    setTripType(value);
  };

  function incrementTravelers() {
    setTravelers((prev) => prev + 1);
  }

  function decrementTravelers() {
    setTravelers((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function getDepartureDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    const nearestSaturday = new Date(today);
    nearestSaturday.setDate(today.getDate() + daysUntilSaturday);

    const defaultDepartureDate = new Date(nearestSaturday);
    defaultDepartureDate.setDate(nearestSaturday.getDate() + 14); // Add 2 weeks

    return defaultDepartureDate;
  }

  function getReturnDate(departureDate) {
    if (!departureDate) {
      departureDate = getDepartureDate();
    }
    const returnDate = new Date(departureDate);
    returnDate.setDate(departureDate.getDate() + 1); // Add 1 day
    return returnDate;
  }

  function getDepartureDateold() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 6) {
      // If today is Saturday, set the departure date to the next Saturday
      const nextSaturday = new Date(today);
      nextSaturday.setDate(today.getDate() + 7);
      return nextSaturday;
    } else {
      // If today is not Saturday, set the departure date to the nearest Saturday
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
      const nearestSaturday = new Date(today);
      nearestSaturday.setDate(today.getDate() + daysUntilSaturday);
      return nearestSaturday;
    }
  }

  const handleButtonClick = () => {
    // Console log some data
    console.log("Departure date old:", getDepartureDateold());
    console.log("Departure date new:", getDepartureDate());
    console.log("Return date new:", getReturnDate());

    console.log("Return date value:", returnDate.$d);
    console.log("departure date value:", departureDate.$d);

    // You can also trigger other actions or functions here
    // For example, submitting the form or making an API call
  };

  return (
    <div className="booking">
      <div className="booking-top">
        <div className="radios">
          <Radio.Group
            defaultValue="Return"
            buttonStyle="solid"
            className="custom-radio-group"
            onChange={(e) => handleTripTypeChange(e.target.value)}
          >
            <Radio.Button value="OneWay">One-way</Radio.Button>
            <Radio.Button value="Return">Round-trip</Radio.Button>
          </Radio.Group>
        </div>

        <div className="party">
          Travelers:{" "}
          <button
            onClick={decrementTravelers}
            className={`button-minus ${travelers === 1 ? "disabled" : ""}`}
          >
            -
          </button>{" "}
          <span className="travelers-text">{travelers}</span>{" "}
          <button onClick={incrementTravelers} className="button-plus">
            +
          </button>
        </div>
      </div>

      <div className="booking-bottom">
        <div className="date-picker">
          {tripType === "OneWay" ? (
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
              value={
                departureDate && departureDate.$d
                  ? departureDate.$d.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : getDepartureDate().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
              }
            />
            <input
              type="hidden"
              name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[2]/departDate.date"
              value={
                returnDate && returnDate.$d
                  ? returnDate.$d.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : getReturnDate().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
              }
            />

            {/* NOTE TO SELF - I JUST NEED THE DATE TO BE FORMATTED IN THE CORRECT WAY 
            AND REPLACE getDepartureDateold() with departureDate etc  */}

            <input
              type="hidden"
              name={`wdf_person_type${travelers}`}
              value="Adult"
            />

            <button
              type="submit"
              className="book-button2 plausible-event-name=Book2"
              onClick={() => handleButtonClick()}
            >
              {isMobile ? (
                <>
                  <SearchOutlined /> Amtrak.com
                </>
              ) : (
                <>
                  <SearchOutlined /> Search on Amtrak.com
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
