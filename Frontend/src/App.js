import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import CourseDetailPage from "./pages/CourseDetail";
import FavouriteCoursesPage from "./pages/FavouriteCourse";
import AppLayout from "./pages/AppLayout";
import ResetPasswordPage from "./pages/ResetPasword";
import ResetEmailPage from "./pages/ResetEmail";
import StripeCheckout from "./pages/StripeCheckout";
import CreateCoursePage from "./pages/CreateCourse";
import CreateCourseModulesPage from "./pages/CreateCourseModules";
import LearningCoursePage from "./pages/LearningCourse";
import MyCoursesPage from "./pages/MyCourses";
import EndCoursePage from "./pages/EndCourse";

import Protected from "./features/auth/components/Protected";
import Logout from "./pages/Logout";
import { login } from "./features/auth/auth-slice";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <AppLayout />,

    children: [
      // learner routes
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":courseId",
        element: <CourseDetailPage />,
      },
      {
        path: "wishlist",
        element: (
          <Protected>
            <FavouriteCoursesPage />
          </Protected>
        ),
      },
      {
        path: "my-courses",
        element: <MyCoursesPage />,
      },
      {
        path: "learning",
        element: (
          <Protected>
            <LearningCoursePage />
          </Protected>
        ),
      },
      // instrutor routes
      {
        path: "create-course/:step",
        element: <CreateCoursePage />,
      },
      {
        path: "create-module",
        element: <CreateCourseModulesPage />,
      },
      {
        path: "end-course",
        element: <EndCoursePage />,
      },
    ],
  },
  {
    path: "/auth/signup",
    element: <SignupPage />,
  },
  {
    path: "/auth/signin",
    element: <SigninPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/reset-email",
    element: <ResetEmailPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/course-checkout/:courseId",
    element: (
      <Protected>
        <StripeCheckout />
      </Protected>
    ),
  },
]);
const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (isLoggedIn !== null) {
      dispatch(login({ role: isLoggedIn.role }));
    }
  }, [isLoggedIn, dispatch]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;

// {
//   "courseTitle": "The Complete JavaScript Course 2023: From Zero to Expert!",
//   "courseDescription": "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
//   "courseAuthor": "Jonas Schmedtmann",
//   "courseImageUrl": "https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg",
//   "coursePrice": 99.99,
//   "courseIntroVideoUrl": "vDQ9GZsJkms",
//   "courseLanguage": "English",
//   "courseDuration": "6 weeks",
//   "courseCategory": "Design",
//   "courseTotalQuiz": 26,
//   "courseTotalAssignment": 5,
//   "courseAuthorImage": "https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg",
//   "courseModules": [
//     {
//       "moduleTitle": "Welcome, Welcome, Welcome!",
//       "moduleDescription": [
//         {
//           "title": "Course Structure and Projects",
//           "duration": "02:15",
//           "url": "vDQ9GZsJkms",
//           "type": "video"
//         },
//         {
//           "title": "Read Before You Start!",
//           "duration": "01:23",
//           "url": "https://wesbos.com/javascript",
//           "type": "notes"
//         },
//         {
//           "title": "Watch Before You Start!",
//           "duration": "10:15",
//           "url": "vDQ9GZsJkms",
//           "type": "video"
//         },
//         {
//           "title": "Setting Up Our Code Editor",
//           "duration": "10:15",
//           "url": "vDQ9GZsJkms",
//           "type": "video"
//         }
//       ]
//     }
//   ]
// }
