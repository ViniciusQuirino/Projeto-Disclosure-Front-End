import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import { iLoginFormValue } from "../../pages/LoginPage";
import { iSignUpFormValue } from "../../pages/RegisterPage";
import { iEditUserInfoFormValue } from "../../components/Modal/ModalProfile";

type iUserProviderProps = {
  children: React.ReactNode;
};

interface iValuesTypes {
  userData: iUser | null;
  authorized: boolean;
  loginUser: (data: iLoginFormValue) => void;
  registerUser: (formData: iSignUpFormValue) => Promise<void>;
  editUserInfo: (formData: iEditUserInfoFormValue) => Promise<void>;
  logout: () => void;
}

export interface iUser {
  email: string;
  name: string;
  profilePicture: string;
  description: string;
  cep: string;
  link: string;
  id: number;
}

export const UserContext = createContext({} as iValuesTypes);

const UserProvider = ({ children }: iUserProviderProps) => {
  const [userData, setUserData] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (formData: iLoginFormValue) => {
    try {
      const { data } = await api.post("/login", formData);
      const { user, accessToken } = data;

      api.defaults.headers.authorization = `Bearer ${accessToken}`;
      localStorage.setItem("@Disclosure:token", JSON.stringify(accessToken));
      localStorage.setItem("@Disclosure:userId", JSON.stringify(user["id"]));

      setUserData(user);
      setAuthorized(true);

      navigate("/dashboard");

      toast.success("Acesso autorizado!");
    } catch (_) {
      toast.error("Usuário não existe!");
    }
  };

  const registerUser = async (formData: iSignUpFormValue) => {
    try {
      await api.post("/register", formData);

      toast.success("Conta criada com sucesso!");

      navigate("/login");
    } catch (_) {
      toast.error("Email já cadastrado");
    }
  };

  const editUserInfo = async (formData: iEditUserInfoFormValue) => {
    const id: number = JSON.parse(localStorage.getItem("@Disclosure:userId")!);

    try {
      const { data } = await api.patch(`/users/${id}`, formData);

      setUserData(data);

      toast.success("Informações editadas com sucesso!");
    } catch (_) {
      toast.error("Algo deu errado :(");
    }
  };

  const logout = () => {
    localStorage.removeItem("@Disclosure:token");
    localStorage.removeItem("@Disclosure:userId");

    setUserData(null);
    setAuthorized(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token: string = JSON.parse(
        localStorage.getItem("@Disclosure:token")!
      );

      const id: number = JSON.parse(
        localStorage.getItem("@Disclosure:userId")!
      );

      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await api.get(`/users/${id}`);

          setUserData(data);
          setAuthorized(true);

          navigate("/dashboard");
        } catch (_) {
          localStorage.removeItem("@Disclosure:token");
          localStorage.removeItem("@Disclosure:userId");
          navigate("/");
        }
      }
    };

    loadUser();
  }, []);

  const value = {
    authorized,
    userData,
    loginUser,
    registerUser,
    editUserInfo,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
