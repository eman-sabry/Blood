
import { Link } from "react-router-dom";
import { useRegisterHospital } from "../../Hooks/Useregisterhospita";
import FormInput from "../../components/FormInput";
import LocationPicker from "../../components/LocationPicker";
import SectionLabel from "../../components/SectionLabel";

export default function RegisterHospital() {
  const { form, location, setLocation, loading, setLoading, onSubmit } =
    useRegisterHospital();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;
  const address = watch("address");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Register Your Hospital
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Get verified and start requesting blood
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <SectionLabel label="Account Info" />

          <FormInput
            register={register("hospitalName")}
            placeholder="Hospital Name"
            error={errors.hospitalName?.message}
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
          <FormInput
            register={register("licenseNumber")}
            placeholder="License Number"
            error={errors.licenseNumber?.message}
          />

          <SectionLabel label="Location Info" />

          <LocationPicker
            setValue={setValue}
            location={location}
            setLocation={setLocation}
            loading={loading}
            setLoading={setLoading}
            address={address}
          />

          <label className="flex flex-col gap-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("terms")}
                className="accent-red-500"
              />
              I agree to the Terms & Conditions
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs">{errors.terms.message}</p>
            )}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-all"
          >
            {isSubmitting ? "Submitting..." : "Request Hospital Access"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <Link to="/login" className="text-red-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
