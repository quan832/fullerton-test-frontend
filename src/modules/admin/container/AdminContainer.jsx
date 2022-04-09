import { Pagination, Popconfirm, Spin } from 'antd';
import Header from 'modules/dashboard/components/Header/Header';
import {
  DashboardContainerStyled,
  DashboardLastChild
} from 'modules/dashboard/container/DashboardContainer.styled';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../actions/adminAction';
import TableAdmin from '../components/Table/Table';
import classnames from "classnames";
import TableMUI from '../components/muiTable/TableMUI';
import { debounce } from 'lodash';
import { STATUS } from 'utils/ENUM';
import FeedbackModal from '../components/FeedbackModal/FeedbackModal';
import StatusClaimTable from '../components/muiTable/StatusClaimTable';
import SearchBarHeader from "../components/searchBar/SearchBarHeader";
import FilterComponent from '../components/Filter/FilterNotificationsQueue';
import moment from 'moment';
const HeaderComponent = (props) => {
  let classes = {
    "-sort-asc": props.isSortedDesc !== undefined && !props.isSortedDesc,
    "-sort-desc": props.isSortedDesc !== undefined && props.isSortedDesc,
  };
  return (
    <div className={classnames(classes)}>
      {props.title}
    </div>
  );
};


export default function AdminContainer() {
  const dispatch = useDispatch();

  const { total, page, isFetching, data } = useSelector((state) => state.admin);

  const [searchObj, setSearchObj] = useState([]);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [sortBy, setSortBy] = useState([]); //sort by include {id: (db field), desc: true/false}

  const onFetchAdminBooking = () => {
    dispatch(AdminAction.fetchBookings({ page: page }));
  };

  const onChangePage = (page) => {
    dispatch(AdminAction.fetchBookings({ page: page }));
  };

  useEffect(() => {
    regetData(1)
  }, []);

  const regetData = React.useCallback(
    debounce((page) => {
      dispatch(AdminAction.fetchBookings({ page: page }));
    }, 500),
    []
  );

  /**
   * callback function get new record
   */
  const fetchData = React.useCallback(
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

  const onRejectedBooking = (id, description) => {
    if (id) {
      const payload = { status: STATUS.reject, description };
      dispatch(AdminAction.updateBooking(id, payload));
      dispatch(AdminAction.closeModal());
    }
  };

  const onOpenModal = (id) => {
    dispatch(AdminAction.openModal(id));
  };

  const onApprove = (id, status) => {
    dispatch(AdminAction.updateBooking(id, { dateId: id}));
  };

  const columns = React.useMemo(() => [
    {
      Header: (tableInstance) => {
        return (
          <HeaderComponent
            isSortedDesc={tableInstance.column.isSortedDesc}
            title="Status"
          />
        );
      },
      accessor: "title",
      align: "center",
      width: 120,
      height: 80
    },
    {
      Header: (tableInstance) => {
        return (
          <HeaderComponent
            isSortedDesc={tableInstance.column.isSortedDesc}
            title="Place"
          />
        );
      },
      accessor: "place",
      align: "left",
      width: 260
    },
    {
      Header: (tableInstance) => {
        return (
          <HeaderComponent
            isSortedDesc={tableInstance.column.isSortedDesc}
            title="Email booking"
          />
        );
      },
      accessor: "email",
      align: "left",
      width: 260
    },
    {
      Header: (tableInstance) => {
        return (
          <HeaderComponent
            isSortedDesc={tableInstance.column.isSortedDesc}
            title="Provider"
          />
        );
      },
      accessor: "provider",
      align: "left",
      width: 176
    },
    {
      Header: (tableInstance) => {
        return (
          <HeaderComponent
            isSortedDesc={tableInstance.column.isSortedDesc}
            title="Time booking"
          />
        );
      },
      accessor: "dateTime",
      align: "left",
      width: 200,
      Cell: (tableInstance) => {
        return (
          moment(tableInstance.cell.value).format('DD/MM/YYYY hh:mm a')
        );
      },
    },
    {
      Header: (tableInstance) => {
        return (
          <HeaderComponent
            isSortedDesc={tableInstance.column.isSortedDesc}
            title="Status"
          />
        );
      },
      accessor: "status",
      align: "left",
      width: 200,
      Cell: (tableInstance) => {
        return (
          <StatusClaimTable
            className="mx-auto"
            status={tableInstance.cell.value}
          />
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      align: "center",
      width: 110,
      Cell: (tableInstance, value) => {
        console.log(tableInstance)
        return (
          <div className="react-action-class wide-cell">
            {tableInstance.cell.row.original?.status === STATUS.pending ? (
              <Popconfirm
                title="Are you sure approve this booking?"
                onConfirm={() => onApprove(tableInstance.cell.row.original?.id)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No">
                <button
                  className="react-table-view-button"
                >
                  <i className="fas fa-square-check" />
                </button>
              </Popconfirm>

            ) : (
              null
            )}
            {tableInstance.cell.row.original?.status === STATUS.pending ? (
              <button className="react-table-suspend-button" onClick={() => onOpenModal(tableInstance.cell.row.original?.id)}>
                <i className="fas fa-user-alt-slash" />
              </button>
            ) : (
              null
            )}
            <button
              className="react-table-edit-button"
              onClick={() => toggleModal(typeModal.edit, value)}>
              <i className="fas fa-eye" />
            </button>
          </div>
        );
      },
    },
  ]);

  return (
    <DashboardContainerStyled>
      <Header title="Admin Bookings" />
      <div className="mb-20"></div>
      <SearchBarHeader placeholder="Search by email, user name, color..." />
      <div className="mb-30"></div>
      <FilterComponent />
      <div
        className="mt-20 pb-100"
        style={{ position: 'relative', minHeight: '-webkit-fill-available' }}>
        <Spin spinning={isFetching} style={{ minHeight: '-webkit-fill-available' }}>
          {/* <TableAdmin /> */}
          <TableMUI
            columns={columns}
            data={data}
            total={total}
            fetchData={fetchData}
            pageSize={take}
            skipPageReset={true}
          />
        </Spin>
        <FeedbackModal onOk={onRejectedBooking} key={Math.random()} />
      </div>
    </DashboardContainerStyled>
  );
}
