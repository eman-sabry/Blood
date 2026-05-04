import { useProfileUpdate } from "../Hooks/useProfileUpdate";
import FormInput from "../components/FormInput";
import LocationPicker from "../components/LocationPicker";
import SectionLabel from "../components/SectionLabel";
import { FaArrowLeft, FaCamera, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const {
    form,
    location,
    setLocation,
    imagePreview,
    handleImageChange,
    loading,
    setLoading,
    isLoading,
    isSubmitting,
    onSubmit,
    role,
  } = useProfileUpdate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const address = watch("address");

  if (isLoading)
    return <div className="text-center py-20">Loading profile data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-900 transition"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-28 h-28">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-300 text-4xl" />
                )}
              </div>
              <label className="absolute bottom-1 right-1 bg-red-500 text-white p-2.5 rounded-full cursor-pointer hover:bg-red-600 transition shadow-md">
                <FaCamera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                  onChange={(e) => {
                    register("image").onChange(e); // تحديث RHF
                    handleImageChange(e); // تحديث المعاينة
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Click camera to change photo
            </p>
          </div>

          <SectionLabel label="Account Info" />
          <FormInput
            register={register("name")}
            placeholder="Full Name"
            error={errors.name?.message}
          />
          <FormInput
            register={register("phone")}
            placeholder="Phone Number"
            error={errors.phone?.message}
          />

          {role === "donor" && (
            <>
              <SectionLabel label="Physical Details" />
              <div className="grid grid-cols-3 gap-4">
                <FormInput
                  register={register("age")}
                  placeholder="Age"
                  type="number"
                  error={errors.age?.message}
                />
                <FormInput
                  register={register("weight")}
                  placeholder="Weight"
                  type="number"
                  error={errors.weight?.message}
                />
                <FormInput
                  register={register("height")}
                  placeholder="Height"
                  type="number"
                  error={errors.height?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <select
                    {...register("gender")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <span className="text-red-500 text-xs px-1">
                      {errors.gender.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <select
                    {...register("bloodType")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white"
                  >
                    <option value="">Blood Type</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ),
                    )}
                  </select>
                  {errors.bloodType && (
                    <span className="text-red-500 text-xs px-1">
                      {errors.bloodType.message}
                    </span>
                  )}
                </div>
              </div>

              <FormInput
                register={register("diseases")}
                placeholder="Chronic diseases (if any)"
                error={errors.diseases?.message}
              />
            </>
          )}

          {role === "hospital" && (
            <FormInput
              register={register("licenseNumber")}
              placeholder="Medical License Number"
              error={errors.licenseNumber?.message}
            />
          )}

          <SectionLabel label="Location" />
          <LocationPicker
            setValue={setValue}
            location={location}
            setLocation={setLocation}
            loading={loading}
            setLoading={setLoading}
            address={address}
          />
          {errors.address && (
            <p className="text-red-500 text-xs px-1">
              {errors.address.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-bold transition disabled:opacity-50 shadow-lg shadow-red-100 mt-4"
          >
            {isSubmitting ? "Saving Changes..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
