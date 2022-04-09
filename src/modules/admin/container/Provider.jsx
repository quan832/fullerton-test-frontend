import Header from 'modules/dashboard/components/Header/Header'
import { DashboardContainerStyled } from 'modules/dashboard/container/DashboardContainer.styled'
import React from 'react'
import AccountManagementTable from '../components/AccountManagementTable/AccountManagementTable'
import SearchBarHeader from '../components/searchBar/SearchBarHeader'
import AdminAction from '../actions/adminAction';
import { useDispatch, useSelector } from 'react-redux'
import ProviderManagement from '../components/ProviderManagement/ProviderManagement'
export default function Provider() {
    const dispatch = useDispatch()
    const fetchUsers = () => {
        dispatch(AdminAction.fetchUsers())
    }

    // React.useEffect(() => {
    //     fetchUsers()
    // }, [])


    return (
        <DashboardContainerStyled>
            <Header title="Provider Management" />
            <div className="mb-20"></div>
            <ProviderManagement />
        </DashboardContainerStyled>
    )
}
