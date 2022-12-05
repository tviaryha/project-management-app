import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
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
import Board from './units/pages/Board/Board';

const { base, signIn, signUp, mainPage, editProfile, board } = Paths;

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
        <Route path={`${board}/:id`} element={<Board />} />
      </Route>
      <Route path={'*'} element={<ErrorPage />} />
    </Route>
  ),
  {
    basename: process.env.PUBLIC_URL
  }
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
