import { Button, Row } from "antd";
import { PHForm } from "../components/form/PHForm";
import { PHInput } from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/features/auth/authSlice";

export const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await changePassword(data);
    console.log(res);

    //Jodi password change hoi tahole logout kore login e redirect korba because owr notun token generate hobe and oita die login hoite hobe

    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={undefined}>
        <PHInput type="text" name="oldPassword" label="Old Password : " />
        <PHInput type="text" name="newPassword" label="New Password : " />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};
