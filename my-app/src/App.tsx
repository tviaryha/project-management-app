import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import { SignIn } from './units/auth/SignIn';
import { SignUp } from './units/auth/SignUp';
import Layout from './units/Layout';
import WelcomePage from './units/WelcomePage';

const Test = () => {
  return <div>TEST</div>;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route path="test" element={<Test />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
