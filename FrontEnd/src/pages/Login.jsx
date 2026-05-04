import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { DASHBOARD } from "../utils/dashboardMap";
import api from "../api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data) => {
  try {
    // 1. Firebase Auth login
    const userCred = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );

    const token = await userCred.user.getIdToken();

    // 2. Backend call (NEW SYSTEM)
    const { data: res } = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res?.user) {
      toast.error("User not found");
      return;
    }

    const role = res.user.role;
    const status = res.user.status;

    if (!role) {
      toast.error("Invalid user role");
      return;
    }

    // 3. Hospital check
    if (role === "hospital" && status === "pending") {
      toast.error("Waiting for admin approval");
      return;
    }

    // 4. Redirect
    const path = DASHBOARD?.[role];

    if (!path) {
      toast.error("Unauthorized user role");
      return;
    }

    toast.success(`Welcome ${role}`);
    navigate(path, { replace: true });
  } catch (err) {
    let message = "Something went wrong";

    if (err.code === "auth/invalid-credential") {
      message = "Email or password is incorrect";
    } else if (err.code === "auth/invalid-email") {
      message = "Invalid email format";
    } else if (err.code === "auth/too-many-requests") {
      message = "Too many attempts, try again later";
    }

    toast.error(message);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-sm p-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>

          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            Good to see you again. Login to continue saving lives
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormInput
            register={register("email")}
            placeholder="Enter your email"
            type="email"
            error={errors.email?.message}
          />

          <FormInput
            register={register("password")}
            placeholder="Enter your password"
            type="password"
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold text-sm transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-red-500 font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
