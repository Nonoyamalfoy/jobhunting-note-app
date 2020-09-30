import React, { useCallback, useState } from "react";
import {
  CalendarBoard,
  AddScheduleDialog,
  SelectedScheduleDialog,
} from "../components/Calendar";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../components/Uikit";
import { Schedule } from "../entity/user";
import dayjs from "dayjs";

const Calendar: React.FC = () => {
  const [addScheduleDialogOpen, setAddScheduleDialogOpen] = useState(false);
  const [selectedScheduleDialogOpen, setSelectedScheduleDialogOpen] = useState(
    false
  );

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

  const handleClickOpenAddScheduleDialog = useCallback(() => {
    setAddScheduleDialogOpen(true);
  }, [setAddScheduleDialogOpen]);

  const handleCloseAddScheduleDialog = useCallback(() => {
    resetSchedule();
    setAddScheduleDialogOpen(false);
  }, [setAddScheduleDialogOpen]);

  const handleClickOpenSelectedScheduleDialog = useCallback(
    (s: Schedule) => {
      setSchedule(s);
      setSelectedScheduleDialogOpen(true);
    },
    [setSelectedScheduleDialogOpen]
  );

  const handleCloseSelectedScheduleDialog = useCallback(() => {
    setSelectedScheduleDialogOpen(false);
  }, [setSelectedScheduleDialogOpen]);

  return (
    <div className="p-calendar">
      <CalendarBoard
        handleClickOpenSelectedScheduleDialog={
          handleClickOpenSelectedScheduleDialog
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
      {/* <SelectedDateSchedulesDialog /> */}
    </div>
  );
};

export default Calendar;
