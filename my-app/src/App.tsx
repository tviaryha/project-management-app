import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import { SignInForm } from './units/auth/SignInForm';
import { SignUpForm } from './units/auth/SignUpForm';
import { Paths } from './enums';
import Layout from './units/layout/Layout';
import WelcomePage from './units/pages/Welcome/Welcome';
import MainPage from './units/pages/Main/Main';
import NewBoard from './units/pages/NewBoard';
import EditProfile from './units/pages/EditProfile';

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

const App = () => <RouterProvider router={router} />;

export default App;
