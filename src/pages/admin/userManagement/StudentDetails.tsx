import { useParams } from "react-router-dom";

export const StudentDetails = () => {
  const { studentId } = useParams();

  //aita backend e patai data fetch korba -> single data
  return (
    <div>
      <h1>This is StudentDetails of {studentId}</h1>
    </div>
  );
};
