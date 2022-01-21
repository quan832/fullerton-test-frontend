import { history } from 'App/App.jsx';
import LoginAction from 'modules/auth/actions/authAction';
import AdminPage from 'pages/Admin/AdminPage';
import HomePage from 'pages/Home/HomePage.jsx';
import LoginPage from 'pages/Login/LoginPage.jsx';
import { store } from '../redux/store.js';

export function handleLogout() {
  store.dispatch(LoginAction.logoutUser());
}

const routesHome = [
  {
    path: '/',
    exact: true,
    component: HomePage
  }
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
