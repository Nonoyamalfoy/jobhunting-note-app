import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import { CloseButton, SaveButton, TextInput } from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";
import { DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import {createStringChangeEventCallback} from "../../lib/createHooks"

const day = dayjs();

const useStyles = makeStyles({
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
  },
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
  const [value, setValue] = React.useState<number | null>(3);
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
  const [date, setDate] = useState(day);
  const [locatin, setLocatin] = useState("");
  const [memo, setMemo] = useState("");


  const inputYearOfEstablish = useCallback(
    (month) => {
      setYearOfEstablish(month);
    },
    [setYearOfEstablish]
  );
  const inputDate = useCallback(
    (date) => {
      setDate(date);
    },
    [setDate]
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
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>

        <Accordion className={classes.Accordion} defaultExpanded>
          <AccordionSummary
            className={classes.AccordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>理念・会社概要</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <TextInput
              label={"理念"}
              multiline={true}
              required={true}
              value={corporatePhilosophy}
              type={"text"}
              onChange={createStringChangeEventCallback(setcorporatePhilosophy)}
            />
            <TextInput
              label={"事業"}
              multiline={true}
              required={true}
              value={companyBusiness}
              type={"text"}
              onChange={createStringChangeEventCallback(setCompanyBusiness)}
            />
            <Grid container>
              <Grid item container spacing={4}>
                <Grid item xs={6}>
                  <DatePicker
                    variant="inline"
                    openTo="year"
                    views={["year", "month"]}
                    format="YYYY/MM"
                    label="設立年"
                    value={yearOfEstablish}
                    onChange={inputYearOfEstablish}
                    fullWidth
                    disableToolbar
                    inputProps={{ style: { fontSize: 17 } }}
                    InputLabelProps={{ style: { fontSize: 17 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    label={"従業員数"}
                    multiline={true}
                    required={true}
                    rows={1}
                    value={numberOfEmployees}
                    type={"text"}
                    onChange={createStringChangeEventCallback(setNumberOfEmployees)}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={4}>
                <Grid item xs={6}>
                  <TextInput
                    label={"資本金"}
                    multiline={true}
                    required={true}
                    rows={1}
                    value={capital}
                    type={"text"}
                    onChange={createStringChangeEventCallback(setCapital)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    label={"年収"}
                    multiline={true}
                    required={true}
                    rows={1}
                    value={annualIncome}
                    type={"text"}
                    onChange={createStringChangeEventCallback(setAnnualIncome)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Typography>求める人物像・スキル</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <TextInput
              label={"人物像"}
              multiline={true}
              required={true}
              value={requiredPersonImage}
              type={"text"}
              onChange={createStringChangeEventCallback(setRequiredPersonImage)}
            />
            <TextInput
              label={"スキル"}
              multiline={true}
              required={true}
              value={requiredSkill}
              type={"text"}
              onChange={createStringChangeEventCallback(setRequiredSkill)}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Typography>将来性・課題</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <TextInput
              label={"将来性"}
              multiline={true}
              required={true}
              value={future}
              type={"text"}
              onChange={createStringChangeEventCallback(setFuture)}
            />
            <TextInput
              label={"課題"}
              multiline={true}
              required={true}
              value={task}
              type={"text"}
              onChange={createStringChangeEventCallback(setTask)}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Typography>労働環境・福利厚生</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <TextInput
              label={"労働環境"}
              multiline={true}
              required={true}
              value={workingEnvironment}
              type={"text"}
              onChange={createStringChangeEventCallback(setWorkingEnvironment)}
            />
            <TextInput
              label={"福利厚生"}
              multiline={true}
              required={true}
              value={welfare}
              type={"text"}
              onChange={createStringChangeEventCallback(setWelfare)}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Typography>志望理由</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <TextInput
              label={"志望理由"}
              multiline={true}
              required={true}
              value={reasonsForAspiration}
              type={"text"}
              onChange={createStringChangeEventCallback(setReasonsForAspiration)}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Typography>面接・試験</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <Grid container>
              <Grid item container>
                <Grid item xs={6}>
                  <DatePicker
                    value={date}
                    label="日程"
                    onChange={inputDate}
                    variant="inline"
                    format="YYYY/MM/DD"
                    animateYearScrolling
                    disableToolbar
                    fullWidth
                    inputProps={{ style: { fontSize: 17 } }}
                    InputLabelProps={{ style: { fontSize: 17 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    label={"場所"}
                    multiline={false}
                    required={true}
                    value={locatin}
                    type={"text"}
                    onChange={createStringChangeEventCallback(setLocatin)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Typography>メモ</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <TextInput
              label={"メモ"}
              multiline={true}
              required={true}
              value={memo}
              type={"text"}
              onChange={createStringChangeEventCallback(setMemo)}
            />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <SaveButton onClick={() => {}} />
      </DialogActions>
    </Dialog>
  );
};

export default AddCompanyDialog;