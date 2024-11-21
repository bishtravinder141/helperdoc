import { lazy } from "react";
import ThanksForRegister from "../pages/HelperSteps/ThanksForRegister";
import ViewFullProfile from "../pages/ViewFullProfile/ViewFullProfile";
import HelperPublicProfileView from "../Components/Signup/HelperRegistrationSteps/HelperPublicProfileView";
import PageNotFound from "../pages/PageNotFound";
const AdminTransaction = lazy(()=>import("../pages/Admin/AdminTransaction/AdminTransaction"))
const ProfilePreview = lazy(() =>
  import("../pages/HelperSteps/ProfilePreview")
);
const SubscriptionPlans = lazy(() =>
  import("../pages/SubscriptionPlan/SubscriptionPlans")
);
const AgencyFullProfile = lazy(() =>
  import("../pages/AgencyFullProfile/AgencyFullProfile")
);
const PaymentSuccess = lazy(() =>
  import("../pages/SubscriptionPlan/PaymentSuccess")
);
const AdminDashboardPage = lazy(() =>
  import("../pages/Admin/AdminDashboardPage")
);
const AdminAgencyPage = lazy(() =>
  import("../pages/Admin/Admin Agency/AdminAgencyPage")
);
const AgencyDetail = lazy(() =>
  import("../pages/Admin/Admin Agency/AgencyDetail")
);
const AdminJobSeeker = lazy(() =>
  import("../pages/Admin/AdminJobSeeker/AdminJobSeeker")
);
const AdminSetting = lazy(() =>
  import("../pages/Admin/Admin Settings/AdminSetting")
);
const AdminContentManagement = lazy(() =>
  import("../pages/Admin/Admin content management/AdminContentManagement")
);
const AdminPostedJobDetails = lazy(() =>
  import("../pages/Admin/Admin Employer Page/AdminPostedJobDetails")
);
const EmployerDetail = lazy(() =>
  import("../pages/Admin/Admin Employer Page/EmployerDetail")
);
const AdminEmployerPage = lazy(() =>
  import("../pages/Admin/Admin Employer Page/AdminEmployerPage")
);
const Faq = lazy(() => import("../pages/Faq/Faq"));
const Contact = lazy(() => import("../Components/Common/Contact"));
const ForgotPassword = lazy(() =>
  import("../pages/ForgotPassword/ForgotPassword")
);
const Conversations = lazy(() =>
  import("../pages/HelperDashboard/Conversations")
);
const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const SelectRole = lazy(() => import("../pages/Registration/SelectRole"));
const SignUp = lazy(() => import("../pages/Registration/SignUp"));
const FeatureJobs = lazy(() => import("../pages/FeatureJobs/FeatureJobs"));
const FeatureEmployers = lazy(() =>
  import("../pages/FeatureEmployer/FeatureEmployers")
);
const NewsFeed = lazy(() => import("../pages/NewsFeed/NewsFeed"));
const OurServices = lazy(() => import("../pages/OurServices/OurServices"));
const HelperRegistrationStep1 = lazy(() =>
  import("../Components/HelperProfile/HelperRegistrationStep1")
);
const HelperProfileDetailsSteps = lazy(() =>
  import("../pages/HelperSteps/HelperProfileDetailsSteps")
);
const Jobs = lazy(() => import("../pages/HelperDashboard/Jobs/Jobs"));
const JobDetails = lazy(() =>
  import("../pages/HelperDashboard/Jobs/JobDetails")
);
const MyApplication = lazy(() =>
  import("../pages/HelperDashboard/MyApplication")
);
const MyProfile = lazy(() => import("../pages/HelperDashboard/MyProfile"));
const MyNotification = lazy(() =>
  import("../pages/HelperDashboard/Notification")
);

const EmployerDashboard = lazy(() =>
  import("../pages/EmployerDashboard/EmployerDashboard")
);

const FindApplicants = lazy(() =>
  import("../pages/FindApplicants/FindApplicants")
);
const ApplicantsPublicPage = lazy(() =>
  import("../pages/FindApplicants/ApplicantsPublicPage")
);

const JobPost = lazy(() => import("../pages/EmployerDashboard/Jobs/JobPost"));
const SubscriptionOrderSummery = lazy(() =>
  import("../Components/Common/Subscription/SubscriptionOrderSummery")
);
const Setting = lazy(() => import("../Components/Common/Setting/Settings"));
const PostedJobDetails = lazy(() =>
  import("../pages/EmployerDashboard/PostedJobDetails")
);
const EmployerProfile = lazy(() =>
  import("../pages/EmployerDashboard/EmployerProfile")
);
const ChatDetails = lazy(() => import("../Components/Common/Chat/chatdetails"));
const AgencyDetails = lazy(() =>
  import("../pages/AgencyDashboard/AgencyDetailsForm/AgencyDetails")
);

const AgencyDashboard = lazy(() =>
  import("../pages/AgencyDashboard/AgencyDashboard")
);
const AgencyJobPosted = lazy(() =>
  import("../pages/AgencyDashboard/AgencyJobPosted")
);
const AgencyProfile = lazy(() =>
  import("../pages/AgencyDashboard/AgencyProfile")
);

export const route = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
    public: true,
  },
  {
    path: "/register",
    element: <SelectRole />,
    public: true,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    public: true,
  },
  {
    path: "/register/helper",
    element: <SignUp />,
    public: true,
  },
  {
    path: "/register/employer",
    element: <SignUp />,
    public: true,
  },
  {
    path: "/register/agency",
    element: <SignUp />,
    public: true,
  },
  {
    path: "/feature-jobs",
    element: <FeatureJobs />,
  },
  {
    path: "/feature-employers",
    element: <FeatureEmployers />,
  },
  {
    path: "/our-service",
    element: <OurServices />,
  },
  {
    path: "/news-feed",
    element: <NewsFeed />,
  },

  // helper steps
  {
    path: "/register/helper/profile-steps/:step",
    element: <HelperProfileDetailsSteps />,
    stepper: true,
  },
  {
    path: "/thankyou",
    element: <ThanksForRegister />,
  },
  // Helper dashboard
  {
    path: "/helper/job-dashboard",
    element: <Jobs />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/job-detail/:id",
    element: <JobDetails />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/my-applications",
    element: <MyApplication />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/my-profile",
    element: <MyProfile />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/notification",
    element: <MyNotification />,
    private: true,
    helper: true,
  },
  {
    path: "helper/profile-preview",
    element: <ProfilePreview />,
  },
  {
    path: "/helper/chat",
    element: <Conversations />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/chat/:receiverId",
    element: <ChatDetails />,
    private: true,
    helper: true,
  },

  {
    path: "/helper/setting",
    element: <Setting />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/faq",
    element: <Faq />,
    private: true,
    payment: true,
  },
  // Employer dashboard
  {
    path: "/employer/dashboard",
    element: <EmployerDashboard />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/job-post",
    element: <JobPost />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/subscriptionDetails/:id",
    element: <SubscriptionOrderSummery />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/subscriptionDetails/paymentSucess",
    element: <SubscriptionOrderSummery />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/subscriptionDetails/paymentCancel",
    element: <SubscriptionOrderSummery />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/setting",
    element: <Setting />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/notification",
    element: <MyNotification />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/my-job-post",
    element: <PostedJobDetails />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/my-profile",
    element: <EmployerProfile />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/find-applicant",
    element: <FindApplicants />,
    private: true,
    employer: true,
  },
  {
    path: "/applicants",
    element: <ApplicantsPublicPage />,
  },
  {
    path: "/employer/subscription-plans",
    element: <SubscriptionPlans />,
    private: true,
    employer: true,
  },
  {
    path: "/applicant-profile-view/:id",
    element: <ViewFullProfile />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/chat/:receiverId",
    element: <ChatDetails />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/subscription-plans",
    element: <SubscriptionPlans />,
    private: true,
    employer: true,
  },
  {
    path: "/employer/contact-us",
    element: <Contact />,
    private: true,
    payment: true,
  },
  {
    path: "/employer/faq",
    element: <Faq />,
    private: true,
    payment: true,
  },

  // Agency Flow
  {
    path: "/agency/agency-details",
    element: <AgencyDetails />,
    stepper: true,
  },
  {
    path: "/agency/subscriptionDetails/:id",
    element: <SubscriptionOrderSummery />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/dashboard",
    element: <AgencyDashboard />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/find-applicant",
    element: <FindApplicants />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/my-job-post",
    element: <AgencyJobPosted />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/job-post/",
    element: <JobPost />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/job-post/:id",
    element: <JobPost />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/job-details/:id",
    element: <PostedJobDetails />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/notification",
    element: <MyNotification />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/setting",
    element: <Setting />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/my-profile",
    element: <AgencyProfile />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/subscription-plans",
    element: <SubscriptionPlans />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/view-full-profile/:id",
    element: <AgencyFullProfile />,
    private: true,
    agency: true,
  },
  {
    path: "/agency/contact-us",
    element: <Contact />,
    private: true,
    payment: true,
  },
  {
    path: "/agency/faq",
    // element: <FindApplicants />,
    element: <Faq />,
    private: true,
    payment: true,
  },

  {
    path: "/agency/resume-view-full-profile/:id",
    element: <AgencyFullProfile />,
    // private: true,
    // agency: true,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
    private: true,
    payment: true,
  },
  {
    path: "/payment-failure",
    element: <PaymentSuccess />,
    private: true,
    payment: true,
  },
  // admin routes
  // admin employer
  {
    path: "/admin/employer",
    element: <AdminEmployerPage />,
    private: true,
    admin: true,
  },
  {
    path: "admin/employer-detail/:id",
    element: <EmployerDetail />,
    private: true,
    admin: true,
  },
  {
    path: "admin/employer-job-detail/:id",
    element: <AdminPostedJobDetails />,
    private: true,
    admin: true,
  },
  // admin employer

  // admin agency
  {
    path: "admin/agency",
    element: <AdminAgencyPage />,
    private: true,
    admin: true,
  },
  {
    path: "admin/agency-detail/:id",
    element: <AgencyDetail />,
    private: true,
    admin: true,
  },

  // admin job seeker
  {
    path: "admin/job-seeker",
    element: <AdminJobSeeker />,
    private: true,
    admin: true,
  },
  {
    path: "admin/job-seeker-detail/:id",
    element: <AgencyFullProfile />,
    private: true,
    admin: true,
  },
  // admin content management

  {
    path: "admin/content-management",
    element: <AdminContentManagement />,
    private: true,
    admin: true,
  },
  // admin setting
  {
    path: "admin/setting/",
    element: <AdminSetting />,
    private: true,
    admin: true,
  },

  {
    path: "/admin/dashboard",
    element: <AdminDashboardPage />,
    private: true,
    admin: true,
  },

  //  admin transactions
  {
    path: "/admin/transaction-details",
    element: <AdminTransaction />,
    private: true,
    admin: true,
  },

  // add more routes here

  {
    path: "*",
    element: <PageNotFound />,
  },
];
