import { useContext } from "react";
import { AuthContext } from "context";
import AuthService from "services/auth-service";

const Logout = ({ children }) => {
  const authContext = useContext(AuthContext);

  useEffect(async () => {
    const response = await AuthService.logout();
    authContext.logout();
  });
  return <>{children}</>;
};

export default Logout;
