
import { useRegisterAdmin } from "../../Hooks/Useregisteradmin";
import FormInput from "../../components/FormInput";
import SectionLabel from "../../components/SectionLabel";
import { Link } from "react-router-dom";
export default function RegisterAdmin() {
  const { form, onSubmit } = useRegisterAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Admin Registration
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            System control access only
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <SectionLabel label="Admin Info" />

          <FormInput
            register={register("name")}
            placeholder="Full Name"
            error={errors.name?.message}
          />
          <FormInput
            register={register("email")}
            placeholder="Email"
            type="email"
            error={errors.email?.message}
          />
          <FormInput
            register={register("password")}
            placeholder="Password"
            type="password"
            error={errors.password?.message}
          />

          <SectionLabel label="Contact Info" />

          <FormInput
            register={register("phone")}
            placeholder="Phone Number"
            error={errors.phone?.message}
          />

          <SectionLabel label="Security Check" />

          <FormInput
            register={register("secretCode")}
            placeholder="Admin Secret Code"
            error={errors.secretCode?.message}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
          >
            {isSubmitting ? "Creating Admin..." : "Create Admin"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
