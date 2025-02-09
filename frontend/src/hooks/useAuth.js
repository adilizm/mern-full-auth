import { useSelector } from "react-redux";
import { store } from "../redux/store";

const useAuth = () => {
  const token = store.getState().users.isAuthenticated
  return token === true;
};

export default useAuth;
