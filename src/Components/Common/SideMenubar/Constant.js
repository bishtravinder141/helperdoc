import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApplicationIcon from "../../../Assets/SVGIcons/ApplicationIcon";
import BriefCaseIcon from "../../../Assets/SVGIcons/BriefCaseIcon";
import NotificationBellIcon from "../../../Assets/SVGIcons/NotificationBellIcon";
import ChatIcon from "../../../Assets/SVGIcons/ChatIcon";
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../../../Assets/SVGIcons/UserIcon";
import AgencySvgIcon from "../../../Assets/SVGIcons/AgencySvgIcon";
import SubscriptionPlanSvgIcon from "../../../Assets/SVGIcons/SubscriptionPlanSvgIcon";
import TransactionDetailSvgIcon from "../../../Assets/SVGIcons/TransactionDetailSvgIcon";
import SupportQueriesSvgIcon from "../../../Assets/SVGIcons/SupportQueriesSvgIcon";
import ContentMangementSvgIcon from "../../../Assets/SVGIcons/ContentMangementSvgIcon";
import EmployerSvgIcon from "../../../Assets/SVGIcons/EmployerSvgIcon";

export const HELPER_SIDE_BAR = [
  {
    tab_name: "jobs",
    link: "/helper/job-dashboard",
    subRoutes: true,
    icon: <BriefCaseIcon />,
  },
  {
    tab_name: "my_applications",
    link: "/helper/my-applications",
    icon: <ApplicationIcon />,
  },
  {
    tab_name: "my_profile",
    link: "/helper/my-profile",
    icon: <UserIcon />,
  },
  {
    tab_name: "notification",
    link: "/helper/notification",
    icon: <NotificationBellIcon />,
  },
  {
    tab_name: "chat",
    link: "/helper/chat",
    icon: <ChatIcon />,
  },
  {
    tab_name: "setting",
    link: "/helper/setting",
    icon: <FontAwesomeIcon color="#646464" icon={faGear} />,
  },
];
export const ADMIN_SIDE_BAR = [
  {
    tab_name: "dashboards",
    link: "/admin/dashboard",
    icon: <BriefCaseIcon />,
  },
  {
    tab_name: "job_seeker",
    link: "/admin/job-seeker",
    icon: <UserIcon />,
  },
  {
    tab_name: "employer",
    link: "/admin/employer",
    urlLinks: ["/admin/employer-detail", "/admin/employer-job-detail"],

    icon: <EmployerSvgIcon />,
  },
  {
    tab_name: "agency",
    link: "/admin/agency",
    urlLinks: ["/admin/agency-detail", "/employer/job-post"],
    icon: <AgencySvgIcon />,
  },
  {
    tab_name: "subscription_plans",
    link: "/admin/subscription-plans",
    icon: <SubscriptionPlanSvgIcon />,
  },
  {
    tab_name: "transaction_details",
    link: "/admin/transaction-details",
    icon: <TransactionDetailSvgIcon />,
  },
  {
    tab_name: "support_and_queries",
    link: "/admin/support-and-queries",
    icon: <SupportQueriesSvgIcon />,
  },
  {
    tab_name: "content_management",
    link: "/admin/content-management",
    icon: <ContentMangementSvgIcon />,
  },
  {
    tab_name: "setting",
    link: "/admin/setting",
    icon: <FontAwesomeIcon color="#646464" icon={faGear} />,
  },
];

export const EMPLOYER_SIDE_BAR = [
  {
    tab_name: "dashboard",
    link: "/employer/dashboard",
    icon: <img src="/dashboard.svg" alt="Logo" />,
    subRoutes: true,
  },
  {
    tab_name: "post_a_job",
    link: "/employer/job-post",
    urlLinks: ["/agency/job-post", "/employer/job-post"],
    icon: <BriefCaseIcon />,
  },
  {
    tab_name: "my_posting",
    link: "/employer/my-job-post",
    urlLinks: [
      "/employer/my-job-post",
      "/agency/my-job-post",
      "/agency/job-details/",
    ],
    icon: <ApplicationIcon />,
    subRoutes: true,
    extraSubRoute: true,
  },
  {
    tab_name: "find_applicant",
    link: "/employer/find-applicant",
    urlLinks: ["/agency/find-applicant", "/agency/view-full-profile/"],
    icon: <FontAwesomeIcon color="#646464" icon={faMagnifyingGlass} />,
  },
  {
    tab_name: "subscription_plan",
    link: "/employer/subscription-plans",
    icon: <img src="/subscription_logo.svg" alt="Logo" className="chat" />,
  },
  {
    tab_name: "my_profile",
    link: "/employer/my-profile",
    icon: <UserIcon />,
  },
  {
    tab_name: "notification",
    link: "/employer/notification",
    icon: <NotificationBellIcon />,
  },
  {
    tab_name: "setting",
    link: "/employer/setting",
    icon: <FontAwesomeIcon color="#646464" icon={faGear} />,
  },
];
