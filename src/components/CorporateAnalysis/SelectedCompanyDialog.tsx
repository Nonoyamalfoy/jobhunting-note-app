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
  Divider,
} from "@material-ui/core";
import { CloseButton, MoreButton, CreateButton } from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 48,
    backgroundColor: "#20295f",
    color: "white",
    alignItems: "center",
    paddingLeft: "24px",
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
    position: "relative",
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
});

type Props = {
  open: boolean;
  handleClose: () => void;
  handleClickOpenAddCompanyDialog: () => void;
};

const SelectedCompany: React.FC<Props> = (props) => {
  const classes = useStyles();

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
      <div className={classes.dialogHeader}>
        <Typography variant="h5" component="h2">
          ヤフー株式会社
        </Typography>
        <DialogActions>
          <MoreButton
            size="small"
            onClickEdit={() => {
              props.handleClickOpenAddCompanyDialog();
              props.handleClose();
            }}
            onClickRemove={props.handleClose}
          />
          <CloseButton onClick={props.handleClose} />
        </DialogActions>
      </div>
      <DialogContent>
        <Box className={classes.box}>
          <Typography>志望度</Typography>
          <Rating readOnly value={3} />
        </Box>

        <Accordion className={classes.Accordion} defaultExpanded>
          <AccordionSummary
            className={classes.AccordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <Typography>理念・会社概要</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddCompanyDialog();
                props.handleClose();
              }}
            />
            <Grid item container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>理念</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              情報技術で人々や社会の課題を解決する
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
            <Typography color="textSecondary">・情報・通信業</Typography>
            <Typography color="textSecondary">・Yahoo!Japan</Typography>
            <Typography color="textSecondary">・ヤフオク！</Typography>
            <Typography color="textSecondary">・Yahoo!モバゲー</Typography>
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
                  <Typography color="textSecondary">1996年1月</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <Grid item container spacing={1} alignItems="center">
                    <Grid item>
                      <span className={classes.rectangle}></span>
                    </Grid>
                    <Grid item>
                      <p>従業員数</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary">6993人</Typography>
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
                      <p>平均年齢</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary">35.7歳</Typography>
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
                  <Typography color="textSecondary">765.1万円</Typography>
                  <Divider />
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
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <Typography>求める人材・スキル</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddCompanyDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>求める人物像</p>
              </Grid>
            </Grid>
            <Grid container justify="flex-start">
              <Grid item>
                <Typography color="textSecondary">・</Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography color="textSecondary">
                  ヤフーのミッションである「情報技術で人々や社会の課題を解決する」に共感し、ヤフーのバリューを発揮できる人材
                </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">・リーダーシップ</Typography>
            <Typography color="textSecondary">・チャレンジ精神</Typography>
            <Divider />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>求めるスキル</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">・高い技術力</Typography>
            <Divider />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <Typography>将来性・課題</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddCompanyDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>将来性</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">未来アリ</Typography>
            <Divider />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>課題</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">課題アリ</Typography>
            <Divider />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <Typography>労働環境・福利厚生</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddCompanyDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>労働環境</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">労働環境ヨシ</Typography>
            <Divider />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>福利厚生</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">福利厚生ヨシ</Typography>
            <Divider />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <Typography>志望理由</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddCompanyDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>志望理由</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">入りたい</Typography>
            <Divider />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.AccordionSummary}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <Typography>面接・試験</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddCompanyDialog();
                props.handleClose();
              }}
            />
            <Grid container>
              <Grid item container>
                <Grid item xs={6}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <span className={classes.rectangle}></span>
                    </Grid>
                    <Grid item>
                      <p>日程</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary">12月21日</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <span className={classes.rectangle}></span>
                    </Grid>
                    <Grid item>
                      <p>場所</p>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary">東京</Typography>
                  <Divider />
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
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <Typography>メモ</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddCompanyDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <p>メモ</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">メモメモ</Typography>
            <Divider />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

export default SelectedCompany;
