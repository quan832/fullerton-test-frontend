import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { ButtonStyled } from 'stylesheet/Button/Button.styled'
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Grid, MenuItem, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontWeight: "600" }} style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <i className="fas fa-xmark" ></i>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  backgroundColor: "#F1F2F4",
}));

const EditAccountDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({});
  const [roles, setRoles] = React.useState([]);
  const [whitelabels, setWhiteLabels] = React.useState('#FFFFFF');

  const handleChangeRole = (event) => {
    setRoles(event.target.value);
  };

  const handleChangeWhiteLabel = (event) => {
    setWhiteLabels(event.target.value);
  };

  const handleClose = () => {
    // props.closeAddAccountDialog();
  };

  useEffect(() => {
    setOpen(props.openDialog);
    setUser(props.selectedUser);
  }, [props.openDialog, props.selectedUser]);

  const closeModal = () => {
    props.callBackClose();
  };


  return (
    <div className="dialog-add">
      <BootstrapDialog
        onClose={closeModal}
        open={open}
        maxWidth="md"
        fullWidth={true}
        aria-labelledby="customized-add-account-dialog-title"
      >
        <BootstrapDialogTitle
          id="customized-add-account-dialog-title"
          onClose={closeModal}
        >
          Edit User
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371">
                  USERNAME *
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Ex: firstname.lastname"
                  sx={{
                    "& label.Mui-focused": {
                      display: "none",
                    },
                    "& legend": {
                      display: "none",
                    },
                    backgroundColor: "white",
                    paddingTop: "5px",
                  }}
                  value={user.name}
                  size="small"
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371">
                  EMAIL *
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Enter a email"
                  sx={{
                    "& label.Mui-focused": {
                      display: "none",
                    },
                    "& legend": {
                      display: "none",
                    },
                    backgroundColor: "white",
                    paddingTop: "5px",
                  }}
                  value={user.email}
                  size="small"
                />
              </Stack>
            </Grid>

            <Grid item xs={6} mb={2}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371" mb={1}>
                  ROLE ID *
                </Typography>
                <Select
                  value={user.type}
                  label="Role ID"
                  onChange={handleChangeRole}
                  sx={{
                    "& label.Mui-focused": {
                      display: "none",
                    },
                    "& legend": {
                      display: "none",
                    },
                    backgroundColor: "white",
                    paddingTop: "5px",
                  }}
                  placeholder="Select a role"
                  size="small"
                >
                  <MenuItem value={'ADMIN'}>Admin</MenuItem>
                  <MenuItem value={'USER'}>User</MenuItem>

                </Select>
              </Stack>
            </Grid>

            {/* <Grid item xs={6}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371">
                  TYPE *
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={"Insurer brokers"}
                >
                  <FormControlLabel
                    value="Insurer brokers"
                    control={<Radio />}
                    label="Insurer brokers"
                  />
                  <FormControlLabel
                    value="Clients"
                    control={<Radio />}
                    label="Clients"
                  />
                </RadioGroup>
              </Stack>
            </Grid> */}

            <Grid item xs={6}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371" mb={1}>
                  WHITE LABEL *
                </Typography>
                <Select
                  value={whitelabels}
                  onChange={handleChangeWhiteLabel}
                  sx={{
                    "& label.Mui-focused": {
                      display: "none",
                    },
                    "& legend": {
                      display: "none",
                    },
                    backgroundColor: "white",
                    paddingTop: "5px",
                  }}
                  placeholder="Select an item"
                  size="small"
                >
                  <MenuItem value="#FFFFFF">#FFFFFF</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionsStyled>
          <ButtonStyled purpleGhost variant="outlined" onClick={closeModal}>
            Cancel
          </ButtonStyled>

          <ButtonStyled
            variant="contained"
            autoFocus
            onClick={() => alert("Add")}
            color="primary"
            purple
          >
            Save Change
          </ButtonStyled>
        </DialogActionsStyled>
      </BootstrapDialog>
    </div>
  );
};

export default EditAccountDialog;
