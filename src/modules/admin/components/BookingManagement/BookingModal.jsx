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
import Stack from "@mui/material/Stack";
import { Grid } from "@material-ui/core";
import "./ViewAccountDialog.scss";
import { ButtonStyled } from "stylesheet/Button/Button.styled";
import moment from 'moment'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2)
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: "600" }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
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

const BookingDialogModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const [booking, setBooking] = useState({});

    const [roles, setRoles] = React.useState([]);
    const [whitelabels, setWhiteLabels] = React.useState([]);

    const handleChangeRole = (event) => {
        setRoles(event.target.value);
    };

    const handleChangeWhiteLabel = (event) => {
        setWhiteLabels(event.target.value);
    };


    useEffect(() => {
        setOpen(props.openDialog);
        setBooking(props.selectedUser)

    }, [props.openDialog, props.selectedUser]);

    const closeModal = () => {
        props.callBackClose();
    };


    return (
        <BootstrapDialog
            onClose={closeModal}
            open={open}
            maxWidth="md"
            fullWidth={true}
            aria-labelledby="customized-view-account-dialog-title"
            className="view-account-container"
        >
            <BootstrapDialogTitle
                id="customized-view-account-dialog-title"
                style={{
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                onClose={closeModal}
            >
                Booking Detail
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item xs={6} md={4}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">Booking *</p>
                            <p className="body-view-account-dialog">{booking?.title}</p>
                        </Stack>
                    </Grid>

                    <Grid item xs={6} md={8}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">STATUS *</p>
                            <p className="body-view-account-dialog">
                                {booking?.status}
                            </p>
                        </Stack>
                    </Grid>

                    <Grid item xs={4} mb={2}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">EMAIL *</p>
                            <p className="body-view-account-dialog">{booking?.email}</p>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} mb={2}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">PLACE</p>
                            <p className="body-view-account-dialog">{booking?.place}</p>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} mb={2}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">PHONE</p>
                            <p className="body-view-account-dialog">{booking?.phone}</p>
                        </Stack>
                    </Grid>


                    <Grid item xs={4} mb={2}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">PROVIDER *</p>
                            <p className="body-view-account-dialog">{booking?.provider}</p>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} mb={2}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">BOOKING DATE</p>
                            <p className="body-view-account-dialog">{moment(booking?.dateTime).format('DD/MM/YYYY hh:mm a')}</p>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} mb={2}>
                        <Stack direction="column" m={1}>
                            <p className="title-view-account-dialog">CREATED AT</p>
                            <p className="body-view-account-dialog">{moment(booking?.createdAt).format('DD/MM/YYYY')}</p>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActionsStyled>
                <Button autoFocus style={{ marginRight: 15 }}>
                    <i className="fas fa-edit edit-icon" style={{ marginRight: 5 }} />{' '}Edit
                </Button>
                {/* <Button autoFocus color="secondary" style={{ marginRight: 15 }}>
                    <i className="fas fa-key delete-icon" style={{ marginRight: 5 }} />{' '}Delete booking
                </Button> */}
                <Button autoFocus color="error" style={{ marginRight: 15 }}>
                    <i className="fas fa-user-slash suspend-icon" style={{ marginRight: 5 }} />{' '} Delete booking
                </Button>
                <div style={{ flex: "1 0 0" }} />
                <ButtonStyled purpleGhost variant="outlined" onClick={closeModal}>
                    Cancel
                </ButtonStyled>
            </DialogActionsStyled>
        </BootstrapDialog>
    );
};

export default BookingDialogModal;
