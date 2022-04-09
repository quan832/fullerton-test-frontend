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
import { connect, useDispatch } from "react-redux";
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
import { ButtonStyled } from "stylesheet/Button/Button.styled";
import AdminAction from "modules/admin/actions/adminAction";

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
  name: yup.string().required(),
  email: yup.string().email(),
  roleId: yup.string().required(),
  whiteLabelId: yup.string().required(),
});

const AddAccountDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const initialValues = {
    name: null,
    email: null,
    roleId: null,
    whiteLabelId: null,
  }
  const [valuesSubmit, setValuesSubmit] = React.useState(initialValues)

  const handleChangeSubmit = (event, key) => {
    disabled()
    setValuesSubmit({
      ...valuesSubmit, [key]: event.target.value
    });
  };
  const dispatch = useDispatch()

  const onSubmit = () => {
    console.log(valuesSubmit)
    dispatch(AdminAction.createAccount(valuesSubmit))
    props.closeModal()
  }

  const handleClose = () => {
    // props.closeAddAccountDialog();
  };

  // useEffect(() => {
  //   setOpen(props.data.openAddAccountDialog);
  // }, [props.data.openAddAccountDialog]);

  const [disabledCallBack, setDisabledCallBack] = React.useState(true)
  const disabled = React.useCallback(async () => {
    const callbackDisabled = await schemaAddUser.isValid(valuesSubmit)
    setDisabledCallBack(!callbackDisabled)
  }, [valuesSubmit.name, valuesSubmit.email, valuesSubmit.roleId, valuesSubmit.whiteLabelId])

  // console.log(disabled)
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
            <Grid item xs={12}>
              <Stack direction="column" m={1}>
                <Typography variant="subtitle2" color="#566371">
                  USERNAME *
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Ex: firstname.lastname"
                  onChange={(e) => handleChangeSubmit(e, 'name')}
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

            <Grid item xs={12}>
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
                  <MenuItem value={'ADMIN'}>Admin</MenuItem>
                  <MenuItem value={'USER'}>User</MenuItem>
                </Select>
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
                  <MenuItem value={'#FFFFFF'}>#FFFFFF</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionsStyled>
          <ButtonStyled purpleGhost variant="outlined" onClick={props.closeModal}>
            Cancel
          </ButtonStyled>
          <ButtonStyled
            purple
            variant="contained"
            autoFocus
            onClick={onSubmit}
            color="primary"
            disabled={disabledCallBack}
          >
            Add
          </ButtonStyled>
        </DialogActionsStyled>
      </BootstrapDialog>
    </div>
  );
};



export default AddAccountDialog
