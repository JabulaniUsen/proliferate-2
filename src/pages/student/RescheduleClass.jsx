import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../context/globalContext";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import { getStartAndEndDates } from "../../utils/timeConversions";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import { BASE_URL } from "../../config";

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => (
  <div>
    <strong>{event.subject}</strong>
  </div>
);

const RescheduleClass = () => {
  const {
    isSubjectDetailsOpen,
    setIsSubjectDetailsOpen,
    editEvent,
    setEditEvent,
    openEditModal,
    setOpenEditModal,
  } = useGlobalContext();
  const { classes } = useUser();
  const { user } = useAuthContext();

  const updatedSchedules = Array.isArray(classes)
    ? classes.map((schedule) => {
        const { start, end } = getStartAndEndDates(
          schedule.date,
          schedule.time
        );

        return {
          ...schedule,
          start,
          end,
          id: schedule.classScheduleId,
          subject: schedule.subjectTitle,
          allDay: false,
          tutor: schedule.tutorName,
        };
      })
    : [];

  const [events, setEvents] = useState(updatedSchedules);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (openEditModal) {
      setCurrentEvent(editEvent);
      setIsEdit(true);
      setModalIsOpen(true);
      setOpenEditModal(false);
    }
  }, [openEditModal]);

  // const handleSelectSlot = ({ start, end }) => {
  //   setCurrentEvent({ start, end });
  //   setIsEdit(false);
  //   setModalIsOpen(true);
  // };
  const handleSelectEvent = (event) => {
    setIsSubjectDetailsOpen(true);
    setEditEvent(event);
  };

  const formatDate = (isoString) => {
    console.log(isoString);
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getUTCHours() + 1;
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let start = `${hours}:${formattedMinutes}${period}`;

    const date2 = new Date(isoString);
    let hours2 = date2.getUTCHours() + 2;
    const minutes2 = date2.getUTCMinutes();
    const period2 = hours2 >= 12 ? "pm" : "am";
    hours2 = hours2 % 12 || 12;
    const formattedMinutes2 = minutes2 < 10 ? `0${minutes2}` : minutes2;
    let end = `${hours2}:${formattedMinutes2}${period2}`;

    return `${start}-${end}`;
  };

  const handleSave = () => {
    const currentDate = new Date();
    const givenDate = new Date(currentEvent.start);

    if (givenDate < currentDate) {
      toast.error("Invalid date");
      return;
    }

    if (reason == "") {
      toast.error("Add a reason for rescheduling");
      return;
    }

    if (isEdit) {
      setEvents(
        events.map((event) =>
          event.id === currentEvent.id
            ? {
                ...currentEvent,
                end: new Date(
                  new Date(currentEvent.start).getTime() + 3600000
                ).toISOString(),
              }
            : event
        )
      );
      setReason("");

      axios
        .post(
          `${BASE_URL}/api/v1/student/reschedule`,
          {
            classScheduleId: currentEvent.classScheduleId,
            date: formatDate(currentEvent.start),
            time: formatTime(currentEvent.start),
            location: currentEvent.location,
            reason,
            schedule: currentEvent.schedule,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => console.log("Changed:", res.data))
        .catch((err) => console.log(err));
    } else {
      setEvents([
        ...events,
        { ...currentEvent, end: currentEvent.start, id: uuidV4() },
      ]);
    }
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    setEvents(events.filter((event) => event.start !== currentEvent.start));
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className="heading">
        <h1>Classes Schedules | Reschedule</h1>
      </div>

      <div className="py-[20px] px-[30px] 2xl:px-[80px]">
        <p className="text-[24px] font-medium font-Montserrat">
          Classes to reschedule
        </p>

        <div className="mt-[40px] h-[500px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={{ month: true, agenda: true }}
            selectable
            // onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            components={{
              event: CustomEvent,
            }}
          />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Event Modal"
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        ariaHideApp={false}
      >
        <button onClick={() => setModalIsOpen(false)}>
          <FaTimes className="absolute top-[20px] right-[20px] text-[red]" />
        </button>
        <h2>{isEdit ? "Edit Event" : "Add Event"}</h2>
        <div className="mb-[10px] leading-[1.1] font-medium">
          <p>
            Your session time will change with this reschedule. A notification
            will be sent to your tutor.
          </p>
        </div>
        <form>
          <div className="mb-[10px] flex gap-[10px] items-center">
            <p>Subject:</p>
            <p className="font-medium">{currentEvent.subject || ""}</p>
          </div>
          <label>
            Start Time:
            <input
              type="datetime-local"
              value={
                moment(currentEvent.start).format("YYYY-MM-DDTHH:mm") || ""
              }
              onChange={(e) =>
                setCurrentEvent({
                  ...currentEvent,
                  start: new Date(e.target.value),
                })
              }
            />
          </label>
          <label>
            Reason for rescheduling:
            <textarea
              name=""
              id=""
              maxLength={100}
              className="resize-none w-full h-[100px] border border-[#d1d5db] rounded-[6px] px-[4px] py-[2px]"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </label>
          <button className="bg-[white]" type="button" onClick={handleSave}>
            Save
          </button>
          {isEdit && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default RescheduleClass;
