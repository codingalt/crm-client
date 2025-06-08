import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy Loading
import Loadable from "@/components/common/loadable";

// Layout components
import BaseLayout from "@/layouts";
import AuthLayout from "@/layouts/auth";
import DashboardLayout from "@/layouts/dashboard";
import LandingLayout from "@/layouts/landing";

// Error pages
import ErrorPage from "@/pages/maintenance/error-page";
import NotFound from "@/components/common/not-found";

// Landing Components
const HomePage = Loadable(
  lazy(() => import("@/pages/landing/home")),
  true
);

// Auth components
const LoginPage = Loadable(lazy(() => import("@/pages/auth/login")));
const SignupPage = Loadable(lazy(() => import("@/pages/auth/signup")));
const VerificationCodePage = Loadable(
  lazy(() => import("@/pages/auth/verification-code"))
);
const ResetPasswordPage = Loadable(
  lazy(() => import("@/pages/auth/reset-password"))
);
const CheckEmailPage = Loadable(
  lazy(() => import("@/pages/auth/reset-password/CheckEmail"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("@/pages/auth/reset-password/NewPassword"))
);
const ResetSuccessPage = Loadable(
  lazy(() => import("@/pages/auth/reset-password/ResetSuccess"))
);

// Dashboard pages
const DashboardPage = Loadable(lazy(() => import("@/pages/apps/dashboard")));
const SubCategoriesPage = Loadable(
  lazy(() => import("@/pages/apps/sub-category"))
);
const BusinessProfilePage = Loadable(
  lazy(() => import("@/pages/apps/business/profile"))
);
const CreateAppointmentPage = Loadable(
  lazy(() => import("@/pages/apps/appointments/create"))
);
const Completion = Loadable(
  lazy(() => import("@/pages/apps/appointments/create/payment/Completion"))
);
const AppointmentsPage = Loadable(
  lazy(() => import("@/pages/apps/appointments/list"))
);
const NotificationsPage = Loadable(
  lazy(() => import("@/pages/apps/notifications"))
);
const ViewSingleServicePage = Loadable(
  lazy(() => import("@/pages/apps/services/single"))
);
const VerifyManualAppointmentPage = Loadable(
  lazy(() => import("@/pages/apps/appointments/manual/VerifyManualAppointment"))
);
const ManualAppointmentPaymentPage = Loadable(
  lazy(() =>
    import("@/pages/apps/appointments/manual/payment/ManualAppointmentPayment")
  )
);
const PaymentSuccessPage = Loadable(
  lazy(() => import("@/pages/apps/appointments/manual/payment/Completion"))
);
const ChatPage = Loadable(lazy(() => import("@/pages/apps/chat")));
const SearchServicesPageMobile = Loadable(
  lazy(() => import("@/pages/apps/services/search/mobile"))
);
const ServicesPage = Loadable(lazy(() => import("@/pages/apps/services/list")));
const ProfilePage = Loadable(lazy(() => import("@/pages/apps/profile")));

// Protected route wrapper
import Protected from "@/components/common/protected/Protected";

// ==============================|| MAIN ROUTES ||==============================
export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Landing Routes
      {
        element: <LandingLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },

      // Auth Routes
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "verificationCode", element: <VerificationCodePage /> },
          { path: "forgot-password", element: <ResetPasswordPage /> },
          { path: "check-email", element: <CheckEmailPage /> },
          { path: "new-password", element: <NewPasswordPage /> },
          { path: "reset-password/success", element: <ResetSuccessPage /> },
          {
            path: "verifyAppointment",
            element: <VerifyManualAppointmentPage />,
          },
          {
            path: "verifyAppointment/payment",
            element: <ManualAppointmentPaymentPage />,
          },
        ],
      },

      // Dashboard Routes
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          {
            path: "categories/:categoryName/:categoryId",
            element: <SubCategoriesPage />,
          },
          {
            path: "businesses/:businessName/:businessId",
            element: <BusinessProfilePage />,
          },
          {
            path: "makeAppointment/:businessName",
            element: <CreateAppointmentPage />,
          },
          { path: "success", element: <Completion /> },
          { path: "appointments", element: <AppointmentsPage /> },
          { path: "chat", element: <ChatPage /> },
          { path: "profile", element: <ProfilePage /> },
          {
            path: "services",
            element: <ServicesPage />,
          },
          {
            path: "service/:serviceName/:serviceId",
            element: <ViewSingleServicePage />,
          },
          { path: "notifications", element: <NotificationsPage /> },
          { path: "payment/success", element: <PaymentSuccessPage /> },
        ],
      },

      { path: "search", element: <SearchServicesPageMobile /> },
      // 404 page
      { path: "*", element: <NotFound /> },
    ],
  },
]);
