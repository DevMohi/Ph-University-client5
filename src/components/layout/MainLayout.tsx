import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Content, Header } = Layout;

export default function MainLayout() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* //The main component should go here  */}
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
