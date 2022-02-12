import DashboardContainer from 'modules/dashboard/container/DashboardContainer';
import React from 'react';
import Header from 'modules/dashboard/components/Header/Header';
import {
    DashboardContainerStyled
} from 'modules/dashboard/container/DashboardContainer.styled';

export default function PaymentPage() {
  return <DashboardContainerStyled>
        <Header title="Payment" />
   </DashboardContainerStyled>;
}