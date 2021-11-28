import AdminPage from 'pages/Admin/AdminPage';
import HomePage from 'pages/Home/HomePage.jsx';
import LoginPage from 'pages/Login/LoginPage.jsx';

const routesHome = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
];

const routesAdmin = [
  {
    path: '/admin',
    exact: true,
    component: AdminPage
  }
]

const routesAuth = [
  {
    path: '/login',
    exact: true,
    component: LoginPage
  }
];

export const routes = { routesHome, routesAuth, routesAdmin };
