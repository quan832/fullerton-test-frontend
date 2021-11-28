/* eslint-disable import/prefer-default-export */
export const SORT = {
  ASC: 'ASC',
  DESC: 'DESC'
};

export const TYPE_MODAL = {
  edit: 'Edit',
  add: 'Add'
}

export const STATUS = {
  pending: "PENDING",
  approve: "APPROVE",
  reject: "REJECTED"
};

export const PROGRESS_STATUS = (status) => {
  switch (status) {
    case STATUS.pending:
      return {
        message: 'Waiting to confirm',
        progress: 0.5,
        color: '#ffc107'
      }
    case STATUS.approve:
      return {
        message: 'Approved',
        progress: 1,
        color: '#28a745'
      }
    case STATUS.reject:
      return {
        message: 'Rejected',
        progress: 0,
        color: '#d1d3e0'
      }
    default:
      return {
        message: '',
        progress: 0
      }
  }
}

export const FORMAT_DATE = 'DD/MM/YYYY'