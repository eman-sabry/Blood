import { useRegisterDonor } from "../../Hooks/useRegisterDonor";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import LocationPicker from "../../components/LocationPicker";
import SectionLabel from "../../components/SectionLabel";
import { Link } from "react-router-dom";
export default function RegisterDonor() {
  const { form, location, setLocation, loading, setLoading, onSubmit } =
    useRegisterDonor();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;
  const address = watch("address");

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-b from-white to-red-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Become a Blood Donor
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Save lives and earn rewards
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <SectionLabel label="Account Info" />

          <FormInput
            register={register("name")}
            placeholder="Full Name"
            error={errors.name?.message}
          />

          <div>
            <label className="text-sm text-gray-500">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image.message}</p>
            )}
          </div>

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
          <FormInput
            register={register("phone")}
            placeholder="Phone Number"
            error={errors.phone?.message}
          />

          <SectionLabel label="Physical Info" />

          <div className="grid grid-cols-3 gap-3">
            <FormInput
              register={register("age")}
              placeholder="Age"
              error={errors.age?.message}
            />
            <FormInput
              register={register("weight")}
              placeholder="Weight (kg)"
              error={errors.weight?.message}
            />
            <FormInput
              register={register("height")}
              placeholder="Height (cm)"
              error={errors.height?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormSelect
              register={register("gender")}
              error={errors.gender?.message}
              options={[
                { value: "", label: "Select Gender" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
            <FormSelect
              register={register("bloodType")}
              error={errors.bloodType?.message}
              options={[
                { value: "", label: "Blood Type" },
                ...["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (t) => ({ value: t, label: t }),
                ),
              ]}
            />
          </div>

          <SectionLabel label="Medical Info" />

          <input
            type="date"
            {...register("lastDonation")}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
          />

          {errors.lastDonation && (
            <p className="text-red-500 text-xs">
              {errors.lastDonation.message}
            </p>
          )}
          <FormInput
            register={register("diseases")}
            placeholder="Diseases (optional)"
          />

          <SectionLabel label="Location" />

          <LocationPicker
            setValue={setValue}
            location={location}
            setLocation={setLocation}
            loading={loading}
            setLoading={setLoading}
            address={address}
          />

          {errors?.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}

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
            disabled={isSubmitting || loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-3 rounded-xl"
          >
            {isSubmitting || loading ? "Creating..." : "Create Account"}
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
