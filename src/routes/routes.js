import HomePage from 'pages/Home/HomePage.jsx';
import LoginPage from 'pages/Login/LoginPage.jsx';

const routesHome = [
  {
    path: '/',
    exact: true,
    component: HomePage
  }
];

const routesAuth = [
  {
    path: '/login',
    exact: true,
    component: LoginPage
  }
];

export const routes = { routesHome, routesAuth };
