import React, { useEffect, useState } from "react";
import Submit from "../../components/Submit";
import { useAuthContext } from "../../context/authContext";
import { fetchData } from "../../utils/fetchData";
import LoadingPage from "../../components/LoadingPage";

const SubmitAssignment = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);

  // user.studentId

  useEffect(() => {
    setLoading(true);
    fetchData(
      `https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/student/assignments`,
      user.token
    )
      .then((res) => {
        setAssignments(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="heading">
            <h1>Assignment</h1>
          </div>

          <div className="py-[40px] pl-[60px] 2xl:pl-[122px] flex flex-col gap-[9px]">
            {assignments &&
              assignments.map((item, i) => <Submit key={i} item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitAssignment;
