import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
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
import { debounce } from "@material-ui/core";
import { toast } from "react-toastify";
import * as yup from 'yup';

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

const schemaAddUser = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email(),
  roleId: yup.string().required(),
  whiteLabelId: yup.string().required(),
  type: yup.string().required()
});

const AddAccountDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const initialValues = {
    username: null,
    email: null,
    roleId: null,
    type: null,
    whiteLabelId: null,
  }
  const [valuesSubmit, setValuesSubmit] = React.useState(initialValues)

  const handleChangeSubmit = (event, key) => {
    setValuesSubmit({
      ...valuesSubmit, [key]: event.target.value
    });
  };

  const onSubmit = () => {
    console.log(valuesSubmit)
    toast.success("User added successfully");
  }

  const handleClose = () => {
    // props.closeAddAccountDialog();
  };

  // useEffect(() => {
  //   setOpen(props.data.openAddAccountDialog);
  // }, [props.data.openAddAccountDialog]);

  const disabled = schemaAddUser.isValid(valuesSubmit).then(function (valid) { return valid }).catch((error) => toast.error(error))
  console.log(disabled)
  return (
    <div className="dialog-add">
      <BootstrapDialog
        onClose={props.closeModal}
        open={props.openModal}
        maxWidth="md"
        fullWidth={true}
        aria-labelledby="customized-add-account-dialog-title"
      >
        <BootstrapDialogTitle
          id="customized-add-account-dialog-title"
          onClose={props.closeModal}
        >
          Add User
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={6}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371">
                  USERNAME *
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Ex: firstname.lastname"
                  onChange={(e) => handleChangeSubmit(e, 'username')}
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
                  size="small"
                />
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371">
                  EMAIL *
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Enter a email"
                  onChange={(e) => handleChangeSubmit(e, 'email')}
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
                  value={valuesSubmit.roleId}
                  label="Role ID"
                  onChange={(e) => handleChangeSubmit(e, 'roleId')}
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
                  {/* {props.data.roles?.map((item, index) => {
                    return <MenuItem value={item.objectId}>{item.name}</MenuItem>
                  })} */}
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                </Select>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371" mb={1}>
                  TYPE *
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => handleChangeSubmit(e, 'type')}
                >
                  <FormControlLabel
                    value="Insurer brokers"
                    control={<Radio />}
                    label="Insurer"
                  />
                  <FormControlLabel
                    value="Client"
                    control={<Radio />}
                    label="Clients"
                  />
                </RadioGroup>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371" mb={1}>
                  WHITE LABEL *
                </Typography>
                <Select
                  value={valuesSubmit.whiteLabelId}
                  onChange={(e) => handleChangeSubmit(e, 'whiteLabelId')}
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
                  {/* {props.data.labelSetting?.map((item, index) => {
                    return <MenuItem value={item.objectId}>{item.name} {item.mainColor}</MenuItem>
                  })} */}
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionsStyled>
          <Button variant="outlined" onClick={props.closeModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            autoFocus
            onClick={onSubmit}
            color="primary"
            disabled={disabled}
          >
            Add
          </Button>
        </DialogActionsStyled>
      </BootstrapDialog>
    </div>
  );
};



export default AddAccountDialog
