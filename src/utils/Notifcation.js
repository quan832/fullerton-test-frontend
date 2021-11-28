import { message } from 'antd';

// if data message is not have
// we do not display system error
// -> we will display try again for user
export function getError(err) {
  let error = 'Error! Please try again';
  if (err.response && err.response.data.errors) {
    const firstError = err.response.data.errors[0];
    if (firstError.msg) {
      error = firstError.msg;
    }
  } else if (err.message || err) {
    error = err.message || err;
  }

  return error;
}

export const successNotification = (mes) => {
  message.success({
    content: mes,
    style: {}
  });
};

export const errorNotification = (mes) => {
  message.error({
    content: mes,
    style: {}
  });
};

export const warningNotification = (mes) => {
  message.warning({
    content: mes,
    style: {}
  });
};
