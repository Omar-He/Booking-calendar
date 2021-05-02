import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./main.scss";
import { getTimeSlots, getConfirmedCall } from "../helpers/requests";
import getDayHours from "../helpers/getDayHours";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getMatchedDays,
  getMatchedHours,
} from "../helpers/comparisonFunctions";
import SlotsModal from "./slotsModal/slotsModal";

export default function Main() {
  const [value, setValue] = useState(new Date());
  const [allocatedSlots, setAllocatedSlots] = useState();
  const [confirmedCalls, setConfirmedCalls] = useState();
  const [slotsToRender, setSlotsToRender] = useState([]);
  const [defaultSlots, setDefaultSlots] = useState([]);
  const [mentorInfo, setMentorInfo] = useState();
  const [openModal, setModalState] = useState(false);

  const getAllocatedSlots = async () => {
    const data = await getTimeSlots();
    setAllocatedSlots(data.calendar);
    setMentorInfo(data.mentor);
  };

  const getConfirmedSlots = async () => {
    const calls = await getConfirmedCall();
    setConfirmedCalls(calls);
  };

  useEffect(() => {
    getAllocatedSlots();
    getConfirmedSlots();
    setDefaultSlots(getDayHours());
    const interval = setInterval(() => {
      getAllocatedSlots();
      console.log("Allocated slots updated!");
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const onCloseModal = () => {
    setModalState(false);
  };

  const onChange = (value) => {
    setValue(value);
    const selectedDay = new Date(value);
    // find the allocated slots for the selected day
    const allocatedDays = getMatchedDays(
      selectedDay,
      allocatedSlots,
      "date_time"
    );

    const confirmedDays = getMatchedDays(
      selectedDay,
      confirmedCalls,
      "call_date"
    );
    //find the matched allocated hour
    if (allocatedDays.length > 0 || confirmedDays.length > 0) {
      const timeSlots = getMatchedHours(
        defaultSlots,
        allocatedDays,
        confirmedDays
      );
      setSlotsToRender(timeSlots);
    } else {
      defaultSlots.map((el) => {
        el.disabled = false;
        el.confirmed = false;
        return el;
      });
      setSlotsToRender([...defaultSlots]);
    }
    setModalState(true);
  };

  return (
    <div>
      <header>
        <h1>CareerFoundry booking calendar</h1>
        {mentorInfo && <h3>Mentor: {mentorInfo.name}</h3>}
      </header>
      <div className="calendar-container">
        <Calendar onChange={onChange} value={value} />
      </div>
      {slotsToRender && (
        <SlotsModal
          openModal={openModal}
          selectedDay={value}
          defaultSlots={slotsToRender}
          onCloseModal={onCloseModal}
          getConfirmedSlots={getConfirmedSlots}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
