import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import { Paths } from './enums';
import Layout from './units/layout/Layout';
import WelcomePage from './units/pages/Welcome/Welcome';
import MainPage from './units/pages/Main/Main';
import EditProfile from './units/pages/EditProfile/EditProfile';
import { Suspense, useEffect } from 'react';
import LinearLoadingIndicator from './components/LinearLoadingIndicator';
import { SignInForm } from './units/auth/SignInForm';
import { SignUpForm } from './units/auth/SignUpForm';
import { AnonimUser, SignedInUser } from './common/AuthWrapper';
import ErrorPage from './units/pages/ErrorPage/ErrorPage';
import useCheckToken from './hooks/useCheckToken';

const { base, signIn, signUp, mainPage, newBoard, editProfile, board } = Paths;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={base} element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route element={<AnonimUser />}>
        <Route path={signIn} element={<SignInForm />} />
        <Route path={signUp} element={<SignUpForm />} />
      </Route>
      <Route element={<SignedInUser />}>
        <Route path={mainPage} element={<MainPage />} />
        <Route path={editProfile} element={<EditProfile />} />
        <Route path={`${board}/:id`} element={<div>todo</div>} />
      </Route>
      <Route path={'*'} element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  const checkToken = useCheckToken();

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <Suspense fallback={<LinearLoadingIndicator />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
