import Header from 'modules/dashboard/components/Header/Header'
import { DashboardContainerStyled } from 'modules/dashboard/container/DashboardContainer.styled'
import React from 'react'
import AccountManagementTable from '../components/AccountManagementTable/AccountManagementTable'
import SearchBarHeader from '../components/searchBar/SearchBarHeader'

export default function Account() {
    return (
        <DashboardContainerStyled>
            <Header title="Account Management" />
            <div className="mb-20"></div>
            <AccountManagementTable />
        </DashboardContainerStyled>
    )
}
