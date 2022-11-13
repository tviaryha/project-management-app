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
import Layout from './units/Layout';
import WelcomePage from './units/WelcomePage/WelcomePage';

const { base, signIn, signUp } = Paths;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={base} element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route path={signIn} element={<SignInForm />} />
      <Route path={signUp} element={<SignUpForm />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
