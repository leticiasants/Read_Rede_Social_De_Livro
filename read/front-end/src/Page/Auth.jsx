import AuthPage from "../components/AuthPage";
import Login from "../components/Login";
import Register from "../components/Register";
import TabComponent from "../components/Tab";

function Auth() {
  const tabsData = [
    { label: "Login", content: <Login /> },
    { label: "Register", content: <Register /> },
  ];

  return (
    <AuthPage>
      <TabComponent tabs={tabsData} />
    </AuthPage>
  );
}

export default Auth;
