import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CloseButton, MoreButton, SelectedDialogAccordion } from "../../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Rating from "@material-ui/lab/Rating";
import { Company } from "../../../type/company";
import HTMLReactParser from "html-react-parser";
import { useSelector } from "react-redux";
import { RootState } from "../../../type/rootState";
import { getSchedules, getUserId } from "../../../reducks/user/selectors";
import { db } from "../../../firebase/index";
import Schedule from "./Schedule";
import dayjs from "dayjs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogHeader: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: 48,
      backgroundColor: "#20295f",
      color: "white",
      alignItems: "center",
      paddingLeft: "24px",
    },
    box: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
      marginTop: 10,
    },
    rectangle: {
      width: 8,
      height: 16,
      display: "block",
      borderRadius: "20%",
      backgroundColor: "rgba(0, 0, 0, 0.30)",
    },
    square: {
      height: 16,
      width: 16,
      display: "block",
      borderRadius: "20%",
      backgroundColor: "#20295f",
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
  selectedCompany: Company;
  handleClose: () => void;
  handleClickOpenAddCompanyDialog: () => void;
};

const SelectedCompanyDialog: React.FC<Props> = ({
  open,
  selectedCompany,
  handleClose,
  handleClickOpenAddCompanyDialog,
}) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";
  // const selectedCompany = props.selectedCompany;
  const companyId = selectedCompany.companyId;

  const schedules = getSchedules(selector);
  const companySchedules = schedules.filter((schedule) =>
    schedule.scheduleId.startsWith(companyId)
  );

  const removeCompany = (companyId: string) => {
    db.collection("users")
      .doc(uid)
      .collection("companies")
      .doc(companyId)
      .delete();

    if (companySchedules.length > 0) {
      companySchedules.map((companySchedule) => {
        db.collection("users")
          .doc(uid)
          .collection("schedules")
          .doc(companySchedule.scheduleId)
          .delete();
      });
    }
  };

  const returnCodeToBr = (text: string) => {
    if (text === "") {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={schrollType}
      fullScreen={matches}
      fullWidth
      maxWidth="md"
    >
      <div className={classes.dialogHeader}>
        <Typography variant="h5" component="h2">
          {selectedCompany.companyName}
        </Typography>
        <DialogActions>
          <MoreButton
            color="white"
            size="small"
            onClickEdit={() => {
              handleClickOpenAddCompanyDialog();
              handleClose();
            }}
            onClickRemove={() => {
              removeCompany(selectedCompany.companyId);
              handleClose();
            }}
          />
          <CloseButton onClick={handleClose} />
        </DialogActions>
      </div>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.box}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.square}></span>
            </Grid>
            <Grid item>
              <Typography>志望度</Typography>
            </Grid>
          </Grid>
          <Rating readOnly value={selectedCompany.aspiration} />
        </Box>

        <SelectedDialogAccordion
          title="理念・会社概要"
          onClick={() => {
            handleClickOpenAddCompanyDialog();
            handleClose();
          }}
        >
          <Typography color="textSecondary">
            <Grid item container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>理念</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {returnCodeToBr(selectedCompany.corporatePhilosophy)}
            </Typography>
            <Divider />

            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>事業内容</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {returnCodeToBr(selectedCompany.companyBusiness)}
            </Typography>
            <Divider />
            <Grid container>
              <Grid item container spacing={4}>
                <Grid item xs={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <span className={classes.rectangle}></span>
                    </Grid>
                    <Grid item>
                      <p>設立年</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary">
                    {dayjs(selectedCompany.yearOfEstablish).format("YYYY/MM")}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={6} style={{ minHeight: 81 }}>
                  <Grid item container spacing={1} alignItems="center">
                    <Grid item>
                      <span className={classes.rectangle}></span>
                    </Grid>
                    <Grid item>
                      <p>従業員数</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary" style={{ minHeight: 24 }}>
                    {selectedCompany.numberOfEmployees}
                  </Typography>
                  <Divider />
                </Grid>
              </Grid>
              <Grid item container spacing={4}>
                <Grid item xs={6}>
                  <Grid item container spacing={1} alignItems="center">
                    <Grid item>
                      <span className={classes.rectangle}></span>
                    </Grid>
                    <Grid item>
                      <p>資本金</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary">
                    {selectedCompany.capital}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <span className={classes.rectangle}></span>
                    </Grid>
                    <Grid item>
                      <p>平均年収</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary">
                    {selectedCompany.annualIncome}
                  </Typography>
                  <Divider />
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </SelectedDialogAccordion>

        <SelectedDialogAccordion
          title="求める人物像・スキル"
          onClick={() => {
            handleClickOpenAddCompanyDialog();
            handleClose();
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>求める人物像</p>
            </Grid>
          </Grid>
          <Grid container justify="flex-start">
            <Typography color="textSecondary">
              {returnCodeToBr(selectedCompany.requiredPersonImage)}
            </Typography>
          </Grid>
          <Divider />
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>求めるスキル</p>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(selectedCompany.requiredSkill)}
          </Typography>
          <Divider />
        </SelectedDialogAccordion>

        <SelectedDialogAccordion
          title="将来性・課題"
          onClick={() => {
            handleClickOpenAddCompanyDialog();
            handleClose();
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>将来性</p>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(selectedCompany.future)}
          </Typography>
          <Divider />
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>課題</p>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(selectedCompany.task)}
          </Typography>
          <Divider />
        </SelectedDialogAccordion>

        <SelectedDialogAccordion
          title="労働環境・福利厚生"
          onClick={() => {
            handleClickOpenAddCompanyDialog();
            handleClose();
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>労働環境</p>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(selectedCompany.workingEnvironment)}
          </Typography>
          <Divider />
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>福利厚生</p>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(selectedCompany.welfare)}
          </Typography>
          <Divider />
        </SelectedDialogAccordion>

        <SelectedDialogAccordion
          title="志望理由"
          onClick={() => {
            handleClickOpenAddCompanyDialog();
            handleClose();
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>志望理由</p>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(selectedCompany.reasonForAspiration)}
          </Typography>
          <Divider />
        </SelectedDialogAccordion>

        <SelectedDialogAccordion
          title="日程"
          onClick={() => {
            handleClickOpenAddCompanyDialog();
            handleClose();
          }}
        >
          <Grid container>
            {companySchedules?.map((schedule, i) => (
              <Schedule schedule={schedule} index={i} key={i} />
            ))}
          </Grid>
        </SelectedDialogAccordion>

        <SelectedDialogAccordion
          title="メモ"
          onClick={() => {
            handleClickOpenAddCompanyDialog();
            handleClose();
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>メモ</p>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(selectedCompany.memo)}
          </Typography>
          <Divider />
        </SelectedDialogAccordion>
      </DialogContent>
    </Dialog>
  );
};

export default SelectedCompanyDialog;
