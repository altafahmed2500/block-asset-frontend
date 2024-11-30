import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from '../components/ProtectedRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />,
      },
      {
        path: '/dashboard',
        exact: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sample-page',
        exact: true,
        element: (
          <ProtectedRoute>
            <SamplePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/icons',
        exact: true,
        element: (
          <ProtectedRoute>
            <Icons />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ui/typography',
        exact: true,
        element: (
          <ProtectedRoute>
            <TypographyPage />
          </ProtectedRoute>),
      },
      {
        path: '/ui/shadow',
        exact: true,
        element: (
          <ProtectedRoute>
            <Shadow />
          </ProtectedRoute>),
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
