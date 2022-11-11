import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import { SignInForm } from './units/auth/SignInForm';
import { SignUpForm } from './units/auth/SignUpForm';
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
      <Route path="signin" element={<SignInForm />} />
      <Route path="signup" element={<SignUpForm />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
