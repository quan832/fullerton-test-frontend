import { history } from 'App/App.jsx';
import LoginAction from 'modules/auth/actions/authAction';
import AdminPage from 'pages/Admin/AdminPage';
import HomePage from 'pages/Home/HomePage.jsx';
import LoginPage from 'pages/Login/LoginPage.jsx';
import ClinicPage from 'pages/Clinic/userpage.jsx';
import ClinicPage1 from 'pages/Clinic/adminpage.jsx';
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
  //   path: '/admin',
  //   exact: true,
  //   component: ClinicPage1
  // }
];

const routesAdmin = [
  {
    path: '/admin',
    exact: true,
    component: AdminPage
  }
];

const routesAuth = [
  {
    path: '/login',
    exact: true,
    component: LoginPage
  }
];


export const routes = { routesHome, routesAuth, routesAdmin };
