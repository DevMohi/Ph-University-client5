/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "sonner";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { FieldValues, SubmitHandler } from "react-hook-form";

export const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const departmentData = {
      name: data.name,
    };

    try {
      console.log(departmentData);
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Faculty created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <h1>This is CreateAcademicDepartment Component</h1>
    </div>
  );
};
