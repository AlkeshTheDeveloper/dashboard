import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../features/auth/authApi";
import { setCredentials, setLoading } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      dispatch(setLoading(true));

      const response = await login(formData);

      dispatch(
        setCredentials({
          user: response.data.data.user,
          token: response.data.data.token,
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="login">
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
        })}
      />

      <p>{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
        })}
      />

      <p>{errors.password?.message}</p>

      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
