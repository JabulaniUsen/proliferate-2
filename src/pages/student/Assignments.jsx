import React, { useEffect, useState } from "react";
import Assignment from "../../components/Assignment";
import { useAuthContext } from "../../context/authContext";
import { fetchData } from "../../utils/fetchData";
import LoadingPage from "../../components/LoadingPage";
import { BASE_URL } from "../../config";

const Assignments = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);

  // user.studentId

  useEffect(() => {
    setLoading(true);
    fetchData(
      `${BASE_URL}/student/assignments`,
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
            {assignments.length > 0 &&
              assignments.map((item, i) => <Assignment key={i} item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
