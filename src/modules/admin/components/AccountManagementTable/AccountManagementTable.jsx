import React, { useState, useMemo, useCallback, useEffect } from "react";
import { debounce } from "@material-ui/core";
import classnames from "classnames";
// import userActions from "redux/account/actions";
// import auActions from "redux/auth/actions";
import { connect } from "react-redux";
// import { useTranslation } from "react-i18next";
// import IntlMessages from "util/intlMessages";

import { ButtonStyled } from "stylesheet/Button/Button.styled";
import { MenuItem, Select, Stack } from "@mui/material";
import AddAccountDialog from "./AddAccountDialog/AddAccountDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SuccessToastContainerStyled,
} from "stylesheet/ToastContainer/ToastContainer.styled";
import ViewAccountDialog from "./ViewAccountDialog/ViewAccountDialog";
import SuspendReleaseAccountDialog from "./SuspendReleaseAccountDialog/SuspendReleaseAccountDialog";
import ResetPasswordAccountDialog from "./ResetPasswordAccountDialog/ResetPasswordAccountDialog";
import EditAccountDialog from "./EditAccountDialog/EditAccountDialog";
import Tooltip from "@mui/material/Tooltip";
import TableMUI from "../muiTable/TableMUI"
import SearchBarHeader from "../searchBar/SearchBarHeader";
// const { suspendUser, getUserByFilter, openAddAccountDialog, getAllRoles, getLabelSettings } = userActions;
// const { sendResetPassword } = auActions;
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

const HeaderComponent = (props) => {
  let classes = {
    "my-2": true,
    "mx-3": true,
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
  };
  return (
    <div className={classnames(classes)}>
      {props.title}
    </div>
  );
};

const AccountManagementTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [alert, setAlert] = useState(true);
  const [alertReset, setAlertReset] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [viewSuspend, setViewSuspend] = useState(false);
  const [viewResetPassword, setViewResetPassword] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);

  const [selectedRole, setSelectedRole] = useState("All roles");
  const [searchObj, setSearchObj] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [sortBy, setSortBy] = useState(null); //sort by include {id: (db field), desc: true/false}
  const [userCount, setUserCount] = useState(0);
  // const { t } = useTranslation();

  // useEffect(() => {
  //   regetData(skip, take, sortBy, searchObj);
  // }, [skip, take, sortBy, searchObj]);

  const regetData = useCallback(
    debounce((skip, take, sortBy, searchObj) => {
      props.getUserByFilter(props.authData, {
        skip,
        take,
        searchKey: searchObj,
        sortBy,
      });
    }, 500),
    []
  );

  const regetAllRolesData = React.useCallback(debounce(() => {
    props.getAllRoles(props.authData);
  }, 500), []);

  // useEffect(() => {
  //   regetAllRolesData()
  // }, [])

  const regetAllWhiteSetting = React.useCallback(debounce(() => {
    props.getLabelSettings(props.authData);
  }, 500), []);

  // useEffect(() => {
  //   regetAllWhiteSetting()
  // }, [])

  const columns = useMemo(
    () => [
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="User ID"
              id="user.userID"
            />
          );
        },
        accessor: "userId",
        align: "center",
        width: 55,
        height: 55,
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Email"
              id="user.email"
            />
          );
        },
        accessor: "email",
        align: "center",
        width: 55,
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Username"
              id="user.userName"
            />
          );
        },
        accessor: "username",
        align: "center",
        width: 55,
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Role Id"
              id="user.roleID"
            />
          );
        },
        accessor: "roleId",
        align: "center",
        width: 55,
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Type"
              id="user.type"
            />
          );
        },
        accessor: "type",
        align: "center",
        width: 55,
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Main Color"
              id="user.mainColor"
            />
          );
        },
        accessor: "mainColor",
        align: "center",
        width: 55,
      },
      {
        Header: (tableInstance) => {
          return (
            <HeaderComponent
              isSortedDesc={tableInstance.column.isSortedDesc}
              title="Action"
              id="user.action"
            />
          );
        },
        accessor: "id",
        align: "center",
        width: 150,
        Cell: (tableInstance) => {
          return (
            <div className="react-action-class wide-cell">
              <Tooltip title="View Detail" placement="top" arrow>
                <button
                  className="react-table-view-button"
                  onClick={() => viewClick(tableInstance.row.original)}
                >
                  <i className="ri-eye-line"></i>
                </button>
              </Tooltip>


              <Tooltip title="Edit User" placement="top" arrow>
                <button
                  className="react-table-edit-button"
                  onClick={() => editClick(tableInstance.row.original)}
                >
                  <i className="ri-edit-2-line"></i>
                </button>
              </Tooltip>

              <Tooltip title="Reset Password" placement="top" arrow>
                <button
                  className="react-table-reset-button"
                  onClick={() => resetPwClick(tableInstance.row.original)}
                >
                  <i className="ri-key-2-line"></i>
                </button>
              </Tooltip>

              <Tooltip title="Suspend" placement="top" arrow>
                <button
                  className="react-table-suspend-button"
                  onClick={() => suspendClick(tableInstance.row.original)}
                >
                  <i className="ri-user-unfollow-line"></i>
                </button>
              </Tooltip>

            </div>
          );
        },
      },
    ],
    []
  );

  const handleChangeSelectedRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const viewClick = (data) => {
    // Here you can view the data and make forward action for view data
    setSelectedUser(data);

    console.log(data);
    setViewDetail(true);
  };

  // close modal
  const closeCallback = () => {
    setSelectedUser(null);
    setViewDetail(false);
    // setEditMode(false);
    // setCreateMode(false);
  };

  // close modal
  const closeCallbackSuspend = () => {
    setSelectedUser(null);
    setViewSuspend(false);
    // setEditMode(false);
    // setCreateMode(false);
  };

  // close modal
  const closeCallbackEdit = () => {
    setSelectedUser(null);
    setViewEdit(false);
    // setEditMode(false);
    // setCreateMode(false);
  };

  // close modal
  const closeCallbackResetPassword = () => {
    setSelectedUser(null);
    setViewResetPassword(false);
    // setEditMode(false);
    // setCreateMode(false);
  };

  const editClick = (data) => {
    // Here you can view the data and make forward action for edit data
    setSelectedUser(data);
    setViewEdit(true);
  };

  const suspendClick = (data) => {
    // Here you can view the data and make forward action for suspend data
    setSelectedUser(data);
    setAlert(true);

    setViewSuspend(true);
  };

  const resetPwClick = (data) => {
    // Here you can view the data and make forward action for reset password data
    setSelectedUser(data);
    // setAlertReset(true);
    setViewResetPassword(true);
  };

  // hide modal
  const hideAlert = () => {
    setAlert(false);
    // setSelectedUser(null);
  };

  const hideAlertReset = () => {
    setAlertReset(false);
    setSelectedUser(null);
  };

  // hide suspend modal
  const onCancel = () => {
    hideAlert();
  };

  // hide reset modal
  const onCancelReset = () => {
    hideAlertReset();
  };

  // confirm suspend user
  const onConfirm = () => {
    //props.suspendUser(props.authData, { userId: selectedUser.UserId });
    hideAlert();
  };

  // confirm send reset password
  const onConfirmSendResetPassword = () => {
    props.sendResetPassword({ email: selectedUser.Email });
    hideAlertReset();
  };

  /**
   * Action: Create new Account
   */
  const createNew = () => {
    //Show modal
    setCreateMode(true);
  };

  /**
   * callback function get new record
   */
  const fetchData = useCallback(
    ({ pageSize, pageIndex, sortBy, filterObject }) => {
      //update skip state
      setSkip(pageIndex * pageSize);

      //update sort by state
      let sortObj = null;
      if (sortBy && sortBy.length > 0) {
        sortObj = {
          id: sortBy[0].id,
          desc: sortBy[0].desc,
        };
      }
      setSortBy(sortObj);

      //update filter state
      let filterObj = [];
      for (let prop in filterObject) {
        if (!filterObject[prop]) continue;
        filterObj.push({
          key: prop,
          value: filterObject[prop],
        });
      }
      setSearchObj(filterObj);
    },
    []
  );

  const filtersRole = [
    { label: "All roles" },
    { label: "ADMIN" },
  ];
  const openAddAccount = () => {
    // Here you can view the data and make forward action for view data
    // props.openAddAccountDialog();

    toast.success("User added successfully");
  };
  return (
    <>
      {alert && (
        <SuccessToastContainerStyled
          position="top-right"
          autoClose={50000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}

      <div className="flex-x align-center pt-4 pb-4 horizontal-stretch" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <SearchBarHeader placeholder="Search by email, user name, color..." />

          {/* <Select
            defaultValue={selectedRole}
            onChange={handleChangeSelectedRole}
            sx={{
              "& label.Mui-focused": {
                display: "none",
              },
              "& legend": {
                display: "none",
              },
              height: "40px !important",
              backgroundColor: "white",
              boxSizing: "border-box",
              borderRadius: "8px",
            }}
          >
            {filtersRole.map((item) => {
              return <MenuItem value={item.label}>{item.label}</MenuItem>;
            })}
          </Select> */}
        </Stack>

        <ButtonStyled purple onClick={openAddAccount}>
          Add User
        </ButtonStyled>
      </div>
      <AddAccountDialog />

      {selectedUser && (
        <ViewAccountDialog
          selectedUser={selectedUser}
          openDialog={viewDetail}
          callBackClose={closeCallback}
        />
      )}

      {selectedUser && (
        <EditAccountDialog
          selectedUser={selectedUser}
          openDialog={viewEdit}
          callBackClose={closeCallbackEdit}
        />
      )}
      {selectedUser && (
        <SuspendReleaseAccountDialog
          selectedUser={selectedUser}
          openDialog={viewSuspend}
          callBackClose={closeCallbackSuspend}
        />
      )}
      {selectedUser && (
        <ResetPasswordAccountDialog
          selectedUser={selectedUser}
          openDialog={viewResetPassword}
          callBackClose={closeCallbackResetPassword}
        />
      )}

      <TableMUI
        columns={columns}
        data={tableData}
        total={userCount}
        fetchData={fetchData}
        pageSize={take}
        skipPageReset={true}
      />
    </>
  );


};

AccountManagementTable.prototype = {};

export default AccountManagementTable
