import styled from "styled-components";
const { ToastContainer } = require("react-toastify");

export const SuccessToastContainerStyled = styled(ToastContainer)`
  .Toastify__toast {
    background: #e5ffee;
    color: #016f50;
    border: 1px solid #27ce9f;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px rgba(20, 149, 93, 0.6),
      0px 0px 20px rgba(20, 149, 93, 0.16);
    border-radius: 8px;
  }
`;