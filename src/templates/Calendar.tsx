import React, { useCallback, useState } from "react";
import { CalendarBoard, AddScheduleDialog } from "../components/Calendar";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../components/Uikit";

const Calendar: React.FC = () => {
  const [addScheduleDialogOpen, setAddScheduleDialogOpen] = useState(false)

  const handleClickOpenAddScheduleDialog = useCallback(() => {
    setAddScheduleDialogOpen(true)
  }, [setAddScheduleDialogOpen])

  const handleCloseAddScheduleDialog = useCallback(() => {
    setAddScheduleDialogOpen(false)
  }, [setAddScheduleDialogOpen])

  return (
    <div className="p-calendar">
      <CalendarBoard />
      <CreateButton onClick={handleClickOpenAddScheduleDialog} size="medium" />
      <AddScheduleDialog open={addScheduleDialogOpen} handleClose={handleCloseAddScheduleDialog}/>
      {/* <SelectedScheduleDialog />
      <SelectedDateSchedulesDialog /> */}
    </div>
  );
};

export default Calendar;
