import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import {
  CloseButton,
  DoubleTextInputAccordion,
  SaveButton,
  SingleTextInputAccordion,
  TextInput,
  ValidationTextInput,
} from "../../Uikit";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import Rating from "@material-ui/lab/Rating";
import dayjs from "dayjs";
import { createStringChangeEventCallback } from "../../../lib/createHooks";
import PhilosophyAndCompanyProfile from "./PhilosophyAndCompanyProfile";
import Schedule from "./Schedule";
import { Company } from "../../../entity/company";
import { addCompany } from "../../../reducks/user/operations";
import { useDispatch, useSelector } from "react-redux";
import { Schedule as ISchedule } from "../../../entity/user";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RootState } from "../../../entity/rootState";
import { getSchedules } from "../../../reducks/user/selectors";

// import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const day = dayjs();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
      marginTop: 10,
    },
    Accordion: {
      padding: 0,
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
      boxShadow: "none",
      margin: 0,
      marginTop: 5,
      "&:before": {
        display: "none",
      },
      "&.Mui-expanded": {
        margin: 0,
      },
    },
    AccordionSummary: {
      padding: "0px 16px 0px 0px",
      "& .MuiAccordionSummary-content": {
        margin: "17px 0px 7px 0px",
      },
    },
    AccordionDetails: {
      display: "block",
      backgroundColor: "#dfe3e7",
      [theme.breakpoints.down(960)]: {
        padding: "8px 5px 16px",
      },
    },
    dialogContent: {
      [theme.breakpoints.down(960)]: {
        padding: "8px 12px",
      },
    },
  })
);

type Props = {
  open: boolean;
  handleClose: () => void;
  company: Company;
};

const AddCompanyDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";
  const company = props.company;
  const companyId = company.companyId;

  const _schedules = getSchedules(selector);
  let companySchedules: ISchedule[];
  if (companyId === "") {
    companySchedules = [];
  } else {
    companySchedules = _schedules.filter((schedule) =>
      schedule.scheduleId.startsWith(companyId)
    );
  }

  const [companyName, setCompanyName] = useState("");
  const [aspiration, setAspiration] = React.useState<number | null>(3);
  const [corporatePhilosophy, setcorporatePhilosophy] = useState("");
  const [companyBusiness, setCompanyBusiness] = useState("");
  const [yearOfEstablish, setYearOfEstablish] = useState(day.format("YYYYMM"));
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [capital, setCapital] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [requiredPersonImage, setRequiredPersonImage] = useState("");
  const [requiredSkill, setRequiredSkill] = useState("");
  const [future, setFuture] = useState("");
  const [task, setTask] = useState("");
  const [workingEnvironment, setWorkingEnvironment] = useState("");
  const [welfare, setWelfare] = useState("");
  const [reasonForAspiration, setReasonForAspiration] = useState("");
  const [memo, setMemo] = useState("");
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [deletedScheduleIdList, setDeletedScheduleIdList] = useState<string[]>(
    []
  );

  const [isCompanyNameEditStart, setIsCompanyNameEditStart] = useState(false);
  const isCompanyNameInValid = !companyName && isCompanyNameEditStart;

  const scheduleIdList = schedules.map((schedule) => schedule.scheduleId);
  const judgementOfSchedulesTitle = schedules.filter((schedule) => 
    schedule.title === ""
  )

  const inputSchedule = useCallback(
    (value: Partial<ISchedule>, i: number) => {
      const _scheduels = schedules.map((schedule, scheduleNumber) => {
        return i === scheduleNumber ? { ...schedule, ...value } : schedule;
      });
      setSchedules([..._scheduels]);
    },
    [setSchedules, schedules]
  );

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      {
        scheduleId: "",
        title: "",
        color: "default",
        date: day.format("YYYYMMDDHHmm"),
        location: "",
        description: "",
      },
    ]);
  };

  const deleteSchedule = (scheduleNumber: number) => {
    const _scheduels = schedules.filter((_, i) => i !== scheduleNumber);
    setSchedules([..._scheduels]);
    const deletedScheduleId = schedules[scheduleNumber].scheduleId;
    setDeletedScheduleIdList([...deletedScheduleIdList, deletedScheduleId]);
  };

  const inputYearOfEstablish = useCallback(
    (month: dayjs.Dayjs) => {
      setYearOfEstablish(month.format("YYYYMM"));
    },
    [setYearOfEstablish]
  );

  useEffect(() => {
    setCompanyName(company.companyName);
    setAspiration(company.aspiration);
    setcorporatePhilosophy(company.corporatePhilosophy);
    setCompanyBusiness(company.companyBusiness);
    setYearOfEstablish(company.yearOfEstablish);
    setNumberOfEmployees(company.numberOfEmployees);
    setCapital(company.capital);
    setAnnualIncome(company.annualIncome);
    setRequiredPersonImage(company.requiredPersonImage);
    setRequiredSkill(company.requiredSkill);
    setFuture(company.future);
    setTask(company.task);
    setWorkingEnvironment(company.workingEnvironment);
    setWelfare(company.welfare);
    setReasonForAspiration(company.reasonForAspiration);
    setMemo(company.memo);
    setSchedules(companySchedules);
    // }
  }, [company]);

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.handleClose();
        setIsCompanyNameEditStart(false);
      }}
      scroll={schrollType}
      fullScreen={matches}
      fullWidth
      maxWidth="md"
    >
      <div className="dialogHeader">
        <DialogActions>
          <CloseButton
            onClick={() => {
              props.handleClose();
              setIsCompanyNameEditStart(false);
            }}
          />
        </DialogActions>
      </div>
      <DialogContent className={classes.dialogContent}>
        <ValidationTextInput
          autoFocus={true}
          label={"会社名"}
          multiline={false}
          required={true}
          rows={1}
          value={companyName}
          type={"text"}
          onChange={createStringChangeEventCallback(setCompanyName)}
          onBlur={() => setIsCompanyNameEditStart(true)}
          error={isCompanyNameInValid}
          validationText="会社名は必須項目です"
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
          TextInputValue={reasonForAspiration}
          TextInputOnChange={createStringChangeEventCallback(
            setReasonForAspiration
          )}
        />

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Typography>面接・試験日程</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            {schedules.map((schedule, i) => (
              <Schedule
                key={i}
                addSchedule={addSchedule}
                schedule={schedule}
                index={i}
                inputSchedule={inputSchedule}
                deleteSchedule={deleteSchedule}
              />
            ))}

            <div className="module-spacer--small" />
            <Button onClick={addSchedule} fullWidth variant="outlined">
              日程を追加
            </Button>
          </AccordionDetails>
        </Accordion>

        <SingleTextInputAccordion
          title="メモ"
          TextInputLabel="メモ"
          TextInputValue={memo}
          TextInputOnChange={createStringChangeEventCallback(setMemo)}
        />
      </DialogContent>
      <DialogActions>
        <SaveButton
          onClick={() => {
            dispatch(
              addCompany(
                {
                  companyId: company.companyId,
                  companyName: companyName,
                  aspiration: aspiration,
                  corporatePhilosophy: corporatePhilosophy,
                  companyBusiness: companyBusiness,
                  yearOfEstablish: yearOfEstablish,
                  numberOfEmployees: numberOfEmployees,
                  capital: capital,
                  annualIncome: annualIncome,
                  requiredPersonImage: requiredPersonImage,
                  requiredSkill: requiredSkill,
                  future: future,
                  task: task,
                  workingEnvironment: workingEnvironment,
                  welfare: welfare,
                  reasonForAspiration: reasonForAspiration,
                  memo: memo,
                  schedules: schedules,
                  created_at: company.created_at,
                  updated_at: company.updated_at,
                },
                deletedScheduleIdList
              )
            );
            if (companyName !== "") {
              if(!judgementOfSchedulesTitle.length) {
                props.handleClose();
                setIsCompanyNameEditStart(false);
              }
            }
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddCompanyDialog;
