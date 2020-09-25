import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import {
  CloseButton,
  DoubleTextInputAccordion,
  SaveButton,
  SingleTextInputAccordion,
  TextInput,
} from "../../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Rating from "@material-ui/lab/Rating";
import dayjs from "dayjs";
import { createStringChangeEventCallback } from "../../../lib/createHooks";
import PhilosophyAndCompanyProfile from "./PhilosophyAndCompanyProfile";
import Event from "./Event";
import { Event as IEvent } from "../../../entity/company";

// import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const day = dayjs();

const useStyles = makeStyles({
  box: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
    marginTop: 10,
  },
});

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AddCompanyDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [aspiration, setAspiration] = React.useState<number | null>(3);
  const [companyName, setCompanyName] = useState("");
  const [corporatePhilosophy, setcorporatePhilosophy] = useState("");
  const [companyBusiness, setCompanyBusiness] = useState("");
  const [yearOfEstablish, setYearOfEstablish] = useState(day);
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [capital, setCapital] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [requiredPersonImage, setRequiredPersonImage] = useState("");
  const [requiredSkill, setRequiredSkill] = useState("");
  const [future, setFuture] = useState("");
  const [task, setTask] = useState("");
  const [workingEnvironment, setWorkingEnvironment] = useState("");
  const [welfare, setWelfare] = useState("");
  const [reasonsForAspiration, setReasonsForAspiration] = useState("");
  const [memo, setMemo] = useState("");

  const [events, setEvents] = useState<IEvent[]>([]);


  const inputEvent = useCallback(
    (value: Partial<IEvent>, i: number) => {
      
      // {eventDescription: "a"} 0 のように引数の受け取りに成功している
      console.log(value, i);

      const _events = events.map((event, eventNumber) => {
        // 表示なし
        console.log(event, eventNumber);
        return i === eventNumber ? { ...event, ...value } : event
      });

      // 常に空の配列
      console.log(_events);
      
      setEvents([..._events]);

    },
    [setEvents]
  );

  const addEvent = () => {
    setEvents([
      ...events,
      {
        eventDate: day,
        eventLocation: "",
        eventDescription: "",
      },
    ]);
  };

  const inputYearOfEstablish = useCallback(
    (month) => {
      setYearOfEstablish(month);
    },
    [setYearOfEstablish]
  );

  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      scroll={schrollType}
      fullScreen={matches}
      fullWidth
      maxWidth="md"
    >
      <div className="dialogHeader">
        <DialogActions>
          <CloseButton onClick={props.handleClose} />
        </DialogActions>
      </div>
      <DialogContent>
        <TextInput
          label={"会社名"}
          multiline={false}
          required={true}
          rows={1}
          value={companyName}
          type={"text"}
          onChange={createStringChangeEventCallback(setCompanyName)}
        />

        <Box className={classes.box}>
          <Typography>志望度</Typography>
          <Rating
            name="simple-controlled"
            value={aspiration}
            onChange={(event, newValue) => {
              setAspiration(newValue);
            }}
          />
        </Box>

        <PhilosophyAndCompanyProfile
          corporatePhilosophy={corporatePhilosophy}
          companyBusiness={companyBusiness}
          yearOfEstablish={yearOfEstablish}
          numberOfEmployees={numberOfEmployees}
          capital={capital}
          annualIncome={annualIncome}
          setcorporatePhilosophy={createStringChangeEventCallback(
            setcorporatePhilosophy
          )}
          setCompanyBusiness={createStringChangeEventCallback(
            setCompanyBusiness
          )}
          setYearOfEstablish={inputYearOfEstablish}
          setNumberOfEmployees={createStringChangeEventCallback(
            setNumberOfEmployees
          )}
          setCapital={createStringChangeEventCallback(setCapital)}
          setAnnualIncome={createStringChangeEventCallback(setAnnualIncome)}
        />

        <DoubleTextInputAccordion
          title="求める人物像・スキル"
          firstTextInputLabel="人物像"
          firstTextInputValue={requiredPersonImage}
          firstTextInputOnChange={createStringChangeEventCallback(
            setRequiredPersonImage
          )}
          secondTextInputLabel="スキル"
          secondTextInputValue={requiredSkill}
          secondTextInputOnChange={createStringChangeEventCallback(
            setRequiredSkill
          )}
        />
        <DoubleTextInputAccordion
          title="将来性・課題"
          firstTextInputLabel="将来性"
          firstTextInputValue={future}
          firstTextInputOnChange={createStringChangeEventCallback(setFuture)}
          secondTextInputLabel="課題"
          secondTextInputValue={task}
          secondTextInputOnChange={createStringChangeEventCallback(setTask)}
        />
        <DoubleTextInputAccordion
          title="労働環境・福利厚生"
          firstTextInputLabel="労働環境"
          firstTextInputValue={workingEnvironment}
          firstTextInputOnChange={createStringChangeEventCallback(
            setWorkingEnvironment
          )}
          secondTextInputLabel="福利厚生"
          secondTextInputValue={welfare}
          secondTextInputOnChange={createStringChangeEventCallback(setWelfare)}
        />
        <SingleTextInputAccordion
          title="志望理由"
          TextInputLabel="志望理由"
          TextInputValue={reasonsForAspiration}
          TextInputOnChange={createStringChangeEventCallback(
            setReasonsForAspiration
          )}
        />

        <Event addEvent={addEvent} events={events} inputEvent={inputEvent} />

        <SingleTextInputAccordion
          title="メモ"
          TextInputLabel="メモ"
          TextInputValue={memo}
          TextInputOnChange={createStringChangeEventCallback(setMemo)}
        />
      </DialogContent>
      <DialogActions>
        <SaveButton onClick={() => {}} />
      </DialogActions>
    </Dialog>
  );
};

export default AddCompanyDialog;
