import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  withStyles,
  Box,
  TextField,
} from "@material-ui/core";
import { CloseButton, SaveButton, TextInput } from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Rating from "@material-ui/lab/Rating";
import { DatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";

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
    // color: "rgba(0, 0, 0, 0.54)",
  },
  AccordionDetails: {
    display: "block",
    backgroundColor: "#dfe3e7",
  },
  box: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
    marginTop: 10,
    // color: "rgba(0, 0, 0, 0.54)",
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
  const [corporateProfile, setCorporateProfile] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [companyName, setCompanyName] = useState("");

  const inputCompanyName = useCallback(
    (event) => {
      setCompanyName(event.target.value);
    },
    [setCompanyName]
  );
  const inputCorporatePhilosophy = useCallback(
    (event) => {
      setcorporatePhilosophy(event.target.value);
    },
    [setcorporatePhilosophy]
  );
  const inputCorporateProfile = useCallback(
    (event) => {
      setCorporateProfile(event.target.value);
    },
    [setCorporateProfile]
  );

  const matches = useMediaQuery("(max-width:600px)");
  const schrollType = matches ? "paper" : "body";
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={schrollType}
        fullScreen={matches}
        fullWidth
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
            onChange={inputCompanyName}
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
              // aria-controls="panel1a-content"
              // id="panel1a-header"
            >
              <Typography>理念・会社概要</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"理念"}
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
              />
              <TextInput
                label={"事業"}
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
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
                      value={day}
                      onChange={(d) => () => {}}
                      fullWidth
                      disableToolbar
                      inputProps={{ style: { fontSize: 17 } }}
                      InputLabelProps={{ style: { fontSize: 17 } }}
                    />
                    {/* <DatePicker
                      value={day}
                      label="設立年"
                      onChange={(d) => () => {}}
                      variant="inline"
                      format="YYYY/MM/DD"
                      animateYearScrolling
                      // disableToolbar
                      fullWidth
                      inputProps={{ style: { fontSize: 17 } }}
                      InputLabelProps={{ style: { fontSize: 17 } }}
                    /> */}
                  </Grid>
                  <Grid item xs={6}>
                    <TextInput
                      label={"従業員数"}
                      multiline={false}
                      required={true}
                      rows={1}
                      value={corporatePhilosophy}
                      type={"text"}
                      onChange={inputCorporatePhilosophy}
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={4}>
                  <Grid item xs={6}>
                    <TextInput
                      label={"上場"}
                      multiline={false}
                      required={true}
                      rows={1}
                      value={corporatePhilosophy}
                      type={"text"}
                      onChange={inputCorporatePhilosophy}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextInput
                      label={"年収"}
                      multiline={false}
                      required={true}
                      rows={1}
                      value={corporatePhilosophy}
                      type={"text"}
                      onChange={inputCorporatePhilosophy}
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
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
              />
              <TextInput
                label={"スキル"}
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
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
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
              />
              <TextInput
                label={"課題"}
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
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
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
              />
              <TextInput
                label={"福利厚生"}
                multiline={false}
                required={true}
                rows={1}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
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
                multiline={false}
                required={true}
                rows={8}
                value={corporatePhilosophy}
                type={"text"}
                onChange={inputCorporatePhilosophy}
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
                      value={day}
                      label="日程"
                      onChange={(d) => () => {}}
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
                      rows={1}
                      value={corporatePhilosophy}
                      type={"text"}
                      onChange={inputCorporatePhilosophy}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <SaveButton onClick={() => {}} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCompanyDialog;
