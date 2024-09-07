import React from "react";
import { Route, Routes } from "react-router-dom";
import RescheduleModal from "./modals/RescheduleModal";
import Assignments from "./pages/student/Assignments";
import Classes from "./pages/student/Classes";
import Notifications from "./pages/student/Notifications";
import Overview from "./pages/student/Overview";
import ProgressTracker from "./pages/student/ProgressTracker";
import Refer from "./pages/student/Refer";
import RescheduleClass from "./pages/student/RescheduleClass";
import UpcomingClasses from "./pages/student/UpcomingClasses";
import MsgModal from "./modals/MsgModal";
import SubmitAssignment from "./pages/student/SubmitAssignment";
import Tutors from "./pages/student/Tutors";
import ManageTutors from "./pages/student/ManageTutors";
import TutorDetails from "./pages/student/TutorDetails";
import Messaging from "./pages/student/Messaging";
import Payment from "./pages/student/Payment";
import PaymentHistory from "./pages/student/PaymentHistory";
import CreditPayment from "./pages/student/CreditPayment";
import DebitPayment from "./pages/student/DebitPayment";
import PaypalPayment from "./pages/student/PaypalPayment";
import BankTransferPayment from "./pages/student/BankTransferPayment";
import Feedback from "./pages/student/Feedback";
import Settings from "./pages/student/Settings";
import AccountSetting from "./pages/student/AccountSetting";
import LoginSetting from "./pages/student/LoginSetting";
import ProfileSummary from "./pages/student/ProfileSummary";
import TwoFactorAuth from "./pages/student/TwoFactorAuth";
import ChangePassword from "./modals/ChangePassword";
import ScrollToTop from "./components/ScrollToTop";
import AddTutor from "./pages/student/AddTutor";
import TutorProfile from "./pages/student/TutorProfile";
import TutorList from "./pages/student/TutorList";
import ConfirmSelection from "./modals/ConfirmSelection";
import SubjectDetails from "./modals/SubjectDetails";
import Login from "./pages/student/auth/Login";
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import StudentAuthLayout from "./layouts/StudentAuthLayout";
import Register from "./pages/student/auth/Register";
import PersonalInfo from "./pages/student/auth/PersonalInfo";
import AcademicDetails from "./pages/student/auth/AcademicDetails";
import Preferences from "./pages/student/auth/Preferences";
import LearningGoals from "./pages/student/auth/LearningGoals";
import TandC from "./pages/student/auth/TandC";
import ForgotPassword from "./pages/student/auth/ForgotPassword";
import ChangePasswordPage from "./pages/student/auth/ChangePasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "./context/globalContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/student/auth/ResetPassword";
import TutorAuthLayout from "./layouts/TutorAuthLayout";
import TutorLogin from "./pages/tutor/auth/TutorLogin";
import SignInMode from "./pages/general/SignInMode";
import TutorRegister from "./pages/tutor/auth/TutorRegister";
import TutorPersonalInfo from "./pages/tutor/auth/TutorPersonalInfo";
import EducationAndExperience from "./pages/tutor/auth/EducationAndExperience";
import TeachingStyle from "./pages/tutor/auth/TeachingStyle";
import AvailabilityAndExperience from "./pages/tutor/auth/AvailabilityAndExperience";
import UploadDocument from "./pages/tutor/auth/UploadDocument";
import Tutor_TandC from "./pages/tutor/auth/Tutor_TandC";
import UploadDocumentModal from "./modals/UploadDocument";
import TutorDashboardLayout from "./layouts/TutorDashboardLayout";
import TutorOverview from "./pages/tutor/TutorOverview";
import ErrorModal from "./modals/ErrorModal";
import TutorSchedule from "./pages/tutor/TutorSchedule";
import TutorStudents from "./pages/tutor/TutorStudents";
import TutorAddAssignment from "./pages/tutor/TutorAddAssignment";
import TutorEvaluateAssignment from "./pages/tutor/TutorEvaluateAssignment";
import TutorMessaging from "./pages/tutor/TutorMessaging";
import TutorAddReport from "./pages/tutor/TutorAddReport";
import TutorReportHistory from "./pages/tutor/TutorReportHistory";
import TutorEarnings from "./pages/tutor/TutorEarnings";
import TutorAccountSetting from "./pages/tutor/TutorAccountSetting";
import TutorSettings from "./pages/tutor/TutorSettings";
import TutorLoginSettings from "./pages/tutor/TutorLoginSettings";
import TutorTwoFactorAuth from "./pages/tutor/TutorTwoFactorAuth";
import TutorGradeAndSubjects from "./pages/tutor/TutorGradeAndSubjects";
import TutorProfileSummary from "./pages/tutor/TutorProfileSummary";
import TutorRefer from "./pages/tutor/TutorRefer";
import AccountVerified from "./pages/general/AccountVerified";
import OrderDetails from "./pages/student/OrderDetails";
import TutorNotifications from "./pages/tutor/TutorNotifications";
import OrderDetails2 from "./pages/student/OrderDetails copy";
import { WebSocketProvider } from "./context/WebsocketContext";
import ClassRoom from "./pages/tutor/ClassRoom";

function App() {
  const { isLoaderOpen } = useGlobalContext();
  return (
    <WebSocketProvider>
      <>
      <Routes>
        <Route path="/" element={<SignInMode />} />
        <Route path="/auth/account-verified" element={<AccountVerified />} />

        <Route element={<StudentAuthLayout />}>
          <Route path="/auth/student/login" element={<Login />} />
          <Route path="/auth/student/register" element={<Register />}>
            <Route path="" element={<PersonalInfo />} />
            <Route path="academic-details" element={<AcademicDetails />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="learning-goals" element={<LearningGoals />} />
            <Route path="terms-and-conditions" element={<TandC />} />
          </Route>
          <Route
            path="/auth/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<TutorAuthLayout />}>
          <Route path="/auth/tutor/login" element={<TutorLogin />} />
          <Route path="/auth/tutor/register" element={<TutorRegister />}>
            <Route path="" element={<TutorPersonalInfo />} />
            <Route
              path="education-and-experience"
              element={<EducationAndExperience />}
            />
            <Route
              path="teaching-style-and-approach"
              element={<TeachingStyle />}
            />
            <Route
              path="availability-and-preference"
              element={<AvailabilityAndExperience />}
            />
            <Route path="upload-document" element={<UploadDocument />} />
            <Route path="terms-and-conditions" element={<Tutor_TandC />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<StudentDashboardLayout />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/progress-tracker" element={<ProgressTracker />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/refer" element={<Refer />} />
            <Route path="/classes" element={<Classes />} />
            <Route
              path="/classes/upcoming-classes"
              element={<UpcomingClasses />}
            />
            <Route
              path="/classes/reschedule-class"
              element={<RescheduleClass />}
            />

            <Route path="/tutor/:id/payment" element={<Payment />}>
              <Route path="credit-card" element={<CreditPayment />} />
              <Route path="debit-card" element={<DebitPayment />} />
              <Route path="paypal" element={<PaypalPayment />} />
              <Route path="bank-transfer" element={<BankTransferPayment />} />
            </Route>
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/assignments/submit" element={<SubmitAssignment />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/tutors/manage" element={<ManageTutors />} />
            <Route path="/tutors/tutor/:id" element={<TutorDetails />} />
            <Route path="/tutors/addtutor" element={<AddTutor />} />
            <Route path="/tutors/:id/profile" element={<TutorProfile />} />

            <Route
              path="/tutors/:id/order-details"
              element={<OrderDetails2 />}
            />
            <Route path="/messages" element={<Messaging />} />
            <Route path="/payment" element={<Payment />}>
              <Route path="credit-card" element={<CreditPayment />} />
              <Route path="debit-card" element={<DebitPayment />} />
              <Route path="paypal" element={<PaypalPayment />} />
              <Route path="bank-transfer" element={<BankTransferPayment />} />
            </Route>
            <Route path="/payment/history" element={<PaymentHistory />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="account" element={<AccountSetting />} />
              <Route path="login" element={<LoginSetting />} />
              <Route path="profile" element={<ProfileSummary />} />
              <Route path="two-factor-auth" element={<TwoFactorAuth />} />
            </Route>
          </Route>
        </Route>

        <Route path="/tutor" element={<TutorDashboardLayout />}>
          <Route path="" element={<TutorOverview />} />
          <Route path="schedule" element={<TutorSchedule />} />
          <Route path="schedule/online-classroom/:classId" element={<ClassRoom />} />
          <Route path="manage-students" element={<TutorStudents />} />
          <Route path="add-assignment" element={<TutorAddAssignment />} />
          <Route
            path="manage-assignments"
            element={<TutorEvaluateAssignment />}
          />
          <Route path="notifications" element={<TutorNotifications />} />
          <Route path="messages" element={<TutorMessaging />} />
          <Route path="report/add" element={<TutorAddReport />} />
          <Route path="report/history" element={<TutorReportHistory />} />
          <Route path="earnings" element={<TutorEarnings />} />
          <Route path="settings" element={<TutorSettings />}>
            <Route path="account" element={<TutorAccountSetting />} />
            <Route path="login" element={<TutorLoginSettings />} />

            <Route path="two-factor-auth" element={<TutorTwoFactorAuth />} />
            <Route
              path="grade-and-subjects"
              element={<TutorGradeAndSubjects />}
            />
            <Route path="profile" element={<TutorProfileSummary />} />
          </Route>
          <Route path="refer" element={<TutorRefer />} />
        </Route>
      </Routes>

      {/* Modals */}
      <RescheduleModal />
      <MsgModal />

      <ChangePassword />
      <ConfirmSelection />
      <SubjectDetails />
      <UploadDocumentModal />
      <ErrorModal />

      {/* Scroll To Top on Route change */}
      <ScrollToTop />

      {/* Loader */}
      <div
        className={`${
          !isLoaderOpen && "hidden"
        } fixed top-0 let-0 w-screen h-screen bg-[black]/50 grid place-items-center`}
      >
        <span className="loader"></span>
      </div>

      {/* Toast */}
      <ToastContainer autoClose={4000} />
    </>
    </WebSocketProvider>
  );
}

export default App;
