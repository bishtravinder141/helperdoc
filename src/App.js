import "./App.css";
import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Setting from "./Components/Common/Setting/Settings";
import News from "./pages/NewsFeed/NewsFeed";
import Signup from "./Components/Signup/Signup";
import RegistrationPage from "./Components/Signup/RegistrationPage";
import JobsSection from "./pages/FeatureJobs/FeatureJobs";
import Employers from "./pages/FeatureEmployer/FeatureEmployers";
import OurServices from "./pages/OurServices/OurServices";
import { route } from "./Routes/routes";
import HelperLayout from "./Layouts/HelperLayout";
import ApplicantLayout from "./Layouts/ApplicantLayout";
import CommonLayout from "./Layouts/CommonLayout";
import PublicLayout from "./Layouts/PublicLayout";
import StepperLayout from "./Layouts/StepperLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "./Components/Common/Loader/PageLoader";
import AgencyLayout from "./Layouts/AgencyLayout";
import PaymentLayout from "./Layouts/PaymentLayout";
import AdminLayout from "./Layouts/AdminLayout";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {route.map((item, index) =>
            item.private ? (
              <Fragment key={index}>
                {item.helper ? (
                  <Route key={index} element={<HelperLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : item.employer ? (
                  <Route key={index} element={<ApplicantLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : item.agency ? (
                  <Route key={index} element={<AgencyLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : item.admin ? (
                  <Route key={index} element={<AdminLayout />}>
                    <Route path={item.path} element={item.element} />
                  </Route>
                ) : (
                  item.payment && (
                    <Route key={index} element={<PaymentLayout />}>
                      <Route path={item.path} element={item.element} />
                    </Route>
                  )
                )}
              </Fragment>
            ) : item.public ? (
              <Route key={index} element={<PublicLayout />}>
                <Route path={item.path} element={item.element} />
              </Route>
            ) : item.stepper === true ? (
              <Route key={index} element={<StepperLayout />}>
                <Route path={item.path} element={item.element} />
              </Route>
            ) : (
              <Route key={index} element={<CommonLayout />}>
                <Route path={item.path} element={item.element} />
              </Route>
            )
          )}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
