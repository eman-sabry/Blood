import { useState } from "react";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { useHospitalData } from "../../Hooks/useHospitalData";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaRegListAlt } from "react-icons/fa";

import RequestForm from "../../components/Request/RequestForm";
import ActiveRequests from "../../components/Request/ActiveRequests";
import AllRequests from "../../components/Request/AllRequests";

export default function CreateRequest() {
  const { data: user } = useAuthUser();

  const hospitalId = user?.profileId || user?.id;

  const {
    createBloodRequest,
    activeRequests = [],
    deleteRequest,
    allRequests = [],
  } = useHospitalData(hospitalId);

  const [form, setForm] = useState({
    bloodTypeNeeded: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  // ❗ Prevent actions if no hospitalId
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hospitalId) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      await createBloodRequest(form, user);
      toast.success("Request created successfully");
      setForm({ bloodTypeNeeded: "", quantity: "" });
    } catch  {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!hospitalId) {
      toast.error("User not authenticated");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteRequest(id, hospitalId);
      toast.success("Deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen p-6 ">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Blood Request System
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <RequestForm
            user={user}
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          {/* Active Requests */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaRegListAlt className="text-blue-500" />
              Active Requests
            </h3>
            <div className="h-80 overflow-y-scroll">
              <ActiveRequests
                activeRequests={activeRequests}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>

        {/* All Requests */}
        <div className="mt-10">
          <AllRequests allRequests={allRequests} />
        </div>
      </div>
    </div>
  );
}
