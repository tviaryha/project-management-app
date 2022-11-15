import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import { SignInForm } from './units/Auth/SignInForm';
import { SignUpForm } from './units/Auth/SignUpForm';
import { Paths } from './enums';
import Layout from './units/layout/Layout';
import WelcomePage from './units/pages/Welcome/Welcome';
import MainPage from './units/pages/Main/Main';
import NewBoard from './units/pages/NewBoard';
import EditProfile from './units/pages/EditProfile';
import { Suspense } from 'react';
import LinearLoadingIndicator from './components/LinearLoadingIndicator';

const { base, signIn, signUp, mainPage, newBoard, editProfile } = Paths;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={base} element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route path={signIn} element={<SignInForm />} />
      <Route path={signUp} element={<SignUpForm />} />
      <Route path={mainPage} element={<MainPage />} />
      <Route path={newBoard} element={<NewBoard />} />
      <Route path={editProfile} element={<EditProfile />} />
    </Route>
  )
);

const App = () => (
  <Suspense fallback={<LinearLoadingIndicator />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
