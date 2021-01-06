import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { TextInput, SelectColorBox } from "../../Uikit";
import { DateTimePicker } from "@material-ui/pickers";
import { Schedule as ISchedule } from "../../../type/user";

const useStyles = makeStyles({
  rectangle: {
    width: 8,
    height: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
});

type Props = {
  schedule: ISchedule;
  index: number;
  // addSchedule: () => void;
  inputSchedule: (value: Partial<ISchedule>, i: number) => void;
  deleteSchedule: (scheduleNumber: number) => void;
};

const Schedule: React.FC<Props> = ({
  index,
  schedule,
  // addSchedule,
  inputSchedule,
  deleteSchedule,
}) => {
  const classes = useStyles();
  // const schedule = props.schedule;
  // const index = props.index;
  return (
    <React.Fragment key={index}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <span className={classes.rectangle}></span>hewa
        </Grid>
        <Grid item>
          <p>{`日程 ${index + 1}`}</p>
        </Grid>
      </Grid>

      <Grid container key={index}>
        <Grid item container>
          <Grid item xs={12}>
            <TextInput
              label={"タイトル"}
              multiline={false}
              required={true}
              value={schedule.title}
              type={"text"}
              onChange={(e) => inputSchedule({ title: e.target.value }, index)}
            />
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <SelectColorBox
                label="色"
                required={true}
                select={(c) => inputSchedule({ color: c }, index)}
                value={schedule.color}
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker
                value={schedule.date}
                label="日時"
                ampm={false}
                onChange={(d) =>
                  inputSchedule({ date: d?.format("YYYYMMDDHHmm") }, index)
                }
                variant="inline"
                format="YYYY/MM/DD HH:mm"
                animateYearScrolling
                disableToolbar
                fullWidth
                inputProps={{ style: { fontSize: 17 } }}
                InputLabelProps={{ style: { fontSize: 17 } }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextInput
              label={"概要"}
              multiline={false}
              required={true}
              value={schedule.description}
              type={"text"}
              onChange={(e) =>
                inputSchedule({ description: e.target.value }, index)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              label={"場所"}
              multiline={false}
              required={true}
              value={schedule.location}
              type={"text"}
              onChange={(e) =>
                inputSchedule({ location: e.target.value }, index)
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="module-spacer--small" />
      <Button
        onClick={() => {
          deleteSchedule(index);
        }}
        fullWidth
        variant="outlined"
        color="secondary"
      >
        日程 {index + 1} を削除
      </Button>
    </React.Fragment>
  );
};

export default Schedule;
