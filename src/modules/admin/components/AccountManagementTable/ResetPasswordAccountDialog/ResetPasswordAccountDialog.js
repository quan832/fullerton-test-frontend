import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import { ButtonStyled } from "stylesheet/Button/Button.styled";

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

const ResetPasswordAccountDialog = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleResetPassword = () => {
    toast.success("Reset password sent successfully.");
    props.callBackClose();
  };

  useEffect(() => {
    setOpen(props.openDialog);
  }, [props.openDialog, props.selectedUser]);

  const closeModal = () => {
    props.callBackClose();
  };

  return (
    <BootstrapDialog
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={closeModal}>
        Reset Password
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          An email will be send to the user’s email. Are you sure you want to
          reset password?
        </Typography>
      </DialogContent>
      <DialogActionsStyled>
        <ButtonStyled
          variant="outlined"
          autoFocus
          onClick={closeModal}
          color="primary"
          purpleGhost
        >
          Cancel
        </ButtonStyled>
        <ButtonStyled purple variant="contained" onClick={handleResetPassword}>
          Yes, send it!
        </ButtonStyled>
      </DialogActionsStyled>
    </BootstrapDialog>
  );
};

export default ResetPasswordAccountDialog;
