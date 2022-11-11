import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import { Paths } from './enums';
import Layout from './units/Layout';
import WelcomePage from './units/WelcomePage';

const SignIn = () => {
  return <div>SignIn</div>;
};

const SignUp = () => {
  return <div>SignUp</div>;
};

const { base, signIn, signUp } = Paths;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={base} element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route path={signIn} element={<SignIn />} />
      <Route path={signUp} element={<SignUp />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
