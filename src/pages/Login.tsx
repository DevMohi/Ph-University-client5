import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PHForm } from "../components/form/PHForm";
import { PHInput } from "../components/form/PHInput";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0002",
  //     password: "admin123",
  //   },
  // });

  const defaultValues = {
    id: "2025010001",
    password: "student123",
    // id: "A-0002",
    // password: "admin123",
  };

  //Mutation use korle must unwind korte hobe
  const [login] = useLoginMutation(); //ekta array return korbe

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something else went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="id" label="ID: " />

        <PHInput type="text" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
}
