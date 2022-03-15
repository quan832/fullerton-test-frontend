import { history } from 'App/App.jsx';
import LoginAction from 'modules/auth/actions/authAction';
import AdminPage from 'pages/Admin/AdminPage';
import LoginPage from 'pages/Login/LoginPage.jsx';
import ClinicPage from 'pages/Clinic/userpage.jsx';
import ClinicPage1 from 'pages/Clinic/adminpage.jsx';
import AccountPage from 'pages/ManageAccount/managepage.jsx';
import HomePage from 'pages/Home/HomePage.jsx';
import ToolsPage from 'pages/Tools/ToolsPage.jsx';
import PaymentPage from 'pages/Payment/PaymentPage.jsx';
import ProfilePage from 'pages/profile/ProfilePage.jsx';
import ResourcesPage from 'pages/Resource/ResourcesPage.jsx';
import { store } from '../redux/store.js';

export function handleLogout() {
  store.dispatch(LoginAction.logoutUser());
}

const routesHome = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/user',
    exact: true,
    component: ClinicPage
  },
  // {
  //   path: '/booking',
  //   exact: true,
  //   component: HomePage
  // },
  // {
  //   path: '/payment',
  //   exact: true,
  //   component: PaymentPage
  // },
  // {
  //   path: '/tools',
  //   exact: true,
  //   component: ToolsPage
  // },
  // {
  //   path: '/resource',
  //   exact: true,
  //   component: ResourcesPage
  // },
  // {
  //   path: '/profile',
  //   exact: true,
  //   component: ProfilePage
  // },
];

const routesAdmin = [
  {
    path: '/admin',
    exact: true,
    component: AdminPage
  },
  // {
  //   path: '/clinic',
  //   exact: true,
  //   component: ClinicPage1
  // },
  {
    path: '/account',
    exact: true,
    component: AccountPage
  },
];

const routesAuth = [
  {
    path: '/login',
    exact: true,
    component: LoginPage
  }
];


export const routes = { routesHome, routesAuth, routesAdmin };
