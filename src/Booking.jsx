// Booking.jsx
import React, { useContext, useState, useEffect } from "react";
import { Radio } from "antd";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

import dayjs from "dayjs";
import { FiltersContext } from "./Context/FiltersContext";
import "./Booking.css";
import { SearchOutlined } from "@ant-design/icons";
import Plausible from 'plausible-tracker'

const Booking = ({ originStation, activeStation, isMobile }) => {
  const {
    tripType,
    setTripType,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    travelers,
    setTravelers,
  } = useContext(FiltersContext);

  const [daysOut, setDaysOut] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const timeDiff = departureDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysOut(daysDiff);
  }, [departureDate]);

  const handleTripTypeChange = (value) => {
    setTripType(value);
  };

  const handleDateChange = (date) => {
    if (date) {
      setDepartureDate(date.toDate());
    }
  };

  const handleRangeChange = (dates) => {
    if (dates[0] && dates[1]) {
      setDepartureDate(dates[0].toDate());
      setReturnDate(dates[1].toDate());
    } else if (dates[0]) {
      setDepartureDate(dates[0].toDate());
    }
  };

  function incrementTravelers() {
    setTravelers((prev) => prev + 1);
  }

  function decrementTravelers() {
    setTravelers((prev) => (prev > 1 ? prev - 1 : 1));
  }

  const handleClick = () => {
   // console.log("Departure Date:", departureDate);
   // console.log("Return Date:", returnDate);
   console.log('active station',activeStation)
   console.log('origin station',originStation)
   console.log('daysOut',daysOut)

   // Get the current date
  const currentDate = new Date().toISOString().split('T')[0];

   // Log the event using Plausible with tagged events
 // Log the event using Plausible with tagged events
 Plausible('Book Button Clicked', {
  props: {
    origin: originStation.code,
    destination: activeStation.code,
    departureDate: departureDate.toISOString().split('T')[0],
    returnDate: returnDate.toISOString().split('T')[0],
    currentDate: currentDate,
    tripType: tripType,
    travelers: travelers,
  },
});

  };

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {tripType === "OneWay" ? (
              <DatePicker
                value={dayjs(departureDate)}
                onChange={handleDateChange}
                disablePast
                format="ddd, M/D"
                className="custom-range-picker"
              />
            ) : (
              <DateRangePicker
                value={[dayjs(departureDate), dayjs(returnDate)]}
                onChange={handleRangeChange}
                disablePast
                format="ddd, M/D"
                className="custom-range-picker"
              />
            )}
          </LocalizationProvider>
        </div>

        {/* {isDatePickerOpen && (
        <div className="datepicker-popup-background">
          <div className="close-button" onClick={handleDatePickerClose}>
            <CloseOutlined />
          </div>
          <div className="select-dates-button" onClick={handleSelectDates}>
            Select These Dates
          </div>
        </div>
      )} */}

        <div className="book-button-div">
          <form
            action="https://www.amtrak.com/services/journeysearch"
            method="post"
            target="_blank"
            className={`plausible-event-name=BookTrip plausible-event-departureDate=${departureDate.toISOString().split('T')[0]} plausible-event-returnDate=${returnDate.toISOString().split('T')[0]} plausible-event-travelers=${travelers} plausible-event-origin=${originStation.code} plausible-event-destination=${activeStation.code} plausible-event-originDestinationPair=${originStation.code}-${activeStation.code} plausible-event-daysOut=${daysOut}`}
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
              //  value={departureDate.toISOString().split("T")[0]}

              value={departureDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            />
            <input
              type="hidden"
              name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[2]/departDate.date"
              // value={returnDate.toISOString().split("T")[0]}

              value={returnDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            />

            {Array.from({ length: travelers }, (_, index) => (
              <input
                key={index}
                type="hidden"
                name={`wdf_person_type${index + 1}`}
                value="Adult"
              />
            ))}

            <button
              type="submit"
              className={`book-button2 plausible-event-name=BookTrip plausible-event-departureDate=${departureDate.toISOString().split('T')[0]} plausible-event-returnDate=${returnDate.toISOString().split('T')[0]} plausible-event-travelers=${travelers} plausible-event-origin=${originStation.code} plausible-event-destination=${activeStation.code} plausible-event-originDestinationPair=${originStation.code}-${activeStation.code} plausible-event-daysOut=${daysOut}`}
              onClick={handleClick}
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
