import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";

const TandC = () => {
  const { registerUser } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser();
  };

  return (
    <>
      <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
        <h2 className="text-[24px] font-Montserrat text-center font-bold">
          Terms and Conditions
        </h2>
        <div className="text-[14px] font-Opensans leading-[1.3] md:leading-[30px] py-[20px] px-[0px] md:px-[40px]">
          <h1>
            Welcome to Proliferate Learning Management System (LMS). Before you
            proceed with using our platform, please carefully read and
            understand the following terms and conditions:
          </h1>
          <ul className="mt-[10px] md:mt-0 md:pl-[40px] list-inside list-decimal flex flex-col gap-[10px]">
            <li>
              <strong>Acceptance of Terms:</strong> By accessing or using the
              Proliferate LMS platform, you agree to be bound by these terms and
              conditions, our privacy policy, and all applicable laws and
              regulations. If you do not agree with any part of these terms, you
              may not access or use the platform.
            </li>
            <li>
              <strong>User Registration:</strong> You must register an account
              with accurate and complete information to access certain features
              of the platform. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </li>
            <li>
              <strong>Use of Platform:</strong> Proliferate LMS provides a
              platform for educational purposes, including access to learning
              materials, tutoring services, and communication tools. You agree
              to use the platform only for lawful purposes and in accordance
              with these terms and conditions.
            </li>
            <li>
              <strong>User Content:</strong> You retain ownership of any content
              you submit, upload, or post on the platform. By providing content,
              you grant Proliferate LMS a worldwide, non-exclusive, royalty-free
              license to use, modify, reproduce, and distribute your content for
              the purpose of operating and improving the platform.
            </li>
            <li>
              <strong>Tutoring Services:</strong> Proliferate LMS connects
              students with tutors for educational purposes. We do not guarantee
              the availability, quality, or effectiveness of tutoring services,
              and we are not responsible for any interactions or disputes
              between users.
            </li>
            <li>
              <strong>Payment and Billing:</strong> Certain features or services
              on the platform may require payment. By using these features or
              services, you agree to pay any applicable fees and charges. All
              payments are non-refundable unless otherwise stated. If a student
              is unable to attend a class, they may have the option to
              reschedule the class subject to the tutor's availability. However,
              if no early notification of class rescheduling is provided, the
              missed class will not be refunded. In the event of a missed class
              due to the tutor's unavailability or technical issues, the tutor
              will offer an alternative class schedule.
            </li>
            <li>
              <strong>Platform Content and Intellectual Property:</strong> All
              content available on the platform, including courses, materials,
              and resources, are the intellectual property of Proliferate and
              its tutors. Any unauthorized use, reproduction, or distribution of
              the content is strictly prohibited. Online tutors retain the
              rights to their course content. Learners may not share, reproduce,
              or distribute course materials without the tutor's permission.
            </li>
            <li>
              <strong>Code of Conduct:</strong> Users must conduct themselves
              respectfully and professionally while interacting on the platform.
              Any form of harassment, discrimination, or inappropriate behavior
              will not be tolerated and may result in account termination.
            </li>
            <li>
              <strong>Privacy and Security:</strong> Your privacy and security
              are important to us. Please review our privacy policy to
              understand how we collect, use, and protect your personal
              information.
            </li>
            <li>
              <strong>Modifications to Terms:</strong> Proliferate LMS reserves
              the right to update or modify these terms and conditions at any
              time without prior notice. Your continued use of the platform
              after any such changes constitutes your acceptance of the revised
              terms.
            </li>
            <li>
              <strong>Termination of Account:</strong> Proliferate LMS reserves
              the right to suspend or terminate your account and access to the
              platform at any time for any reason, including but not limited to
              violation of these terms and conditions.
            </li>
            <li>
              <strong>Contact Us:</strong> If you have any questions or concerns
              about these terms and conditions, please contact us at{" "}
              <a
                className="underline text-[blue]"
                href="mailto:contact@proliferate.ai"
              >
                contact@proliferate.ai
              </a>
            </li>
            <li>
              By clicking "Agree and Sign Up" or by accessing and using the
              Proliferate LMS platform, you acknowledge that you have read,
              understood, and agreed to these terms and conditions.
            </li>
          </ul>
        </div>
      </div>

      <div className="auth-footer">
        <Link to="/auth/student/register/learning-goals">
          <p>Back</p>
        </Link>

        <button style={{ width: "fit-content" }} onClick={handleSubmit}>
          Agree and Sign Up
        </button>
      </div>
    </>
  );
};

export default TandC;
