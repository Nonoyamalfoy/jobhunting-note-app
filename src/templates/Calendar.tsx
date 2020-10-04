import React, { useCallback, useState } from "react";
import {
  CalendarBoard,
  AddScheduleDialog,
  SelectedScheduleDialog,
  SelectedDateSchedulesDialog,
} from "../components/Calendar";
import { CreateButton } from "../components/Uikit";
import { Schedule } from "../type/user";
import dayjs from "dayjs";
// import { createContext } from "react";

// const CalendarContext = createContext();
import CalendarContext from "../contexts/CalendarContext";

const Calendar: React.FC = () => {
  const [addScheduleDialogOpen, setAddScheduleDialogOpen] = useState(false);
  const [selectedScheduleDialogOpen, setSelectedScheduleDialogOpen] = useState(
    false
  );
  const [
    selectedDateSchedulesDialogOpen,
    setSelectedDateSchedulesDialogOpen,
  ] = useState(false);

  const [schedule, setSchedule] = useState({
    scheduleId: "",
    title: "",
    color: "default",
    date: dayjs().format("YYYYMMDDHHmm"),
    description: "",
    location: "",
  } as Schedule);

  const resetSchedule = () => {
    setSchedule({
      scheduleId: "",
      title: "",
      color: "default",
      date: dayjs().format("YYYYMMDDHHmm"),
      description: "",
      location: "",
    });
  };

  // addDialog
  const handleClickOpenAddScheduleDialog = useCallback((s?: Schedule) => {
    s && setSchedule(s);
    setAddScheduleDialogOpen(true);
  }, [setAddScheduleDialogOpen]);

  const handleCloseAddScheduleDialog = useCallback(() => {
    resetSchedule();
    setAddScheduleDialogOpen(false);
  }, [setAddScheduleDialogOpen]);

  // selectDialog
  const handleClickOpenSelectedScheduleDialog = useCallback(
    (s: Schedule, e: any) => {
      e.stopPropagation();
      setSchedule(s);
      setSelectedScheduleDialogOpen(true);
    },
    [setSelectedScheduleDialogOpen]
  );
  const handleCloseSelectedScheduleDialog = useCallback(() => {
    setSelectedScheduleDialogOpen(false);
  }, [setSelectedScheduleDialogOpen]);

  const handleClickOpenSelectedDateSchedulesDialog = useCallback(() => {
    setSelectedDateSchedulesDialogOpen(true);
  }, [setSelectedDateSchedulesDialogOpen]);

  const handleCloseSelectedDateSchedulesDialog = useCallback(() => {
    setSelectedDateSchedulesDialogOpen(false);
  }, [setSelectedDateSchedulesDialogOpen]);

  // const CalendarContext = createContext(handleClickOpenSelectedScheduleDialog);

  return (
    <div className="p-calendar">
      <CalendarContext.Provider
        value={{
          handleClickOpenSelectedScheduleDialog: handleClickOpenSelectedScheduleDialog,
          handleClickOpenAddScheduleDialog: handleClickOpenAddScheduleDialog,
        }}
      >
        <CalendarBoard
          handleClickOpenSelectedDateSchedulesDialog={
            handleClickOpenSelectedDateSchedulesDialog
          }
        />
        <CreateButton
          onClick={() => {
            handleClickOpenAddScheduleDialog();
            resetSchedule();
          }}
          size="medium"
        />
        <AddScheduleDialog
          schedule={schedule}
          open={addScheduleDialogOpen}
          handleClose={handleCloseAddScheduleDialog}
        />
        <SelectedScheduleDialog
          open={selectedScheduleDialogOpen}
          handleCloseSelectedScheduleDialog={handleCloseSelectedScheduleDialog}
          handleClickOpenAddScheduleDialog={handleClickOpenAddScheduleDialog}
          selectedSchedule={schedule}
        />
        <SelectedDateSchedulesDialog
          open={selectedDateSchedulesDialogOpen}
          handleClose={handleCloseSelectedDateSchedulesDialog}
        />
      </CalendarContext.Provider>
    </div>
  );
};

export default Calendar;
