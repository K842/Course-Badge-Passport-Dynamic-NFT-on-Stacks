import React, { useEffect, useState } from "react";
import { getPassportCourses, getCourseInfo } from "../stacks/api";

const Dashboard = ({ passportId }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!passportId) return;
      const courseIds = await getPassportCourses(passportId);
      const metadataList = await Promise.all(
        courseIds.map((id) => getCourseInfo(id))
      );
      setCourses(metadataList);
    };

    fetchCourses();
  }, [passportId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Completed Courses</h2>
      <ul className="space-y-4">
        {courses.map((course, index) => (
          <li key={index} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <p>ID: {course.id}</p>
            <p>Issuer: {course.issuer}</p>
          </li>
        ))}
        {courses.length === 0 && <p>No courses found.</p>}
      </ul>
    </div>
  );
};

export default Dashboard;
