import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHospitalData } from "../../Hooks/useHospitalData";

export default function DonationReviewPage() {
  const { requestId } = useParams();

  const { activeRequests, availableDonors, completeDonor } =
    useHospitalData();

  const request = activeRequests.find((r) => r.id === requestId);

  const [selectedDonor, setSelectedDonor] = useState(null);

  const [notes, setNotes] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [temperature, setTemperature] = useState("");

  if (!request) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Loading request...
      </p>
    );
  }

  const donors = request.acceptedDonors || [];

  const getDonorData = (donorId) =>
    availableDonors.find(
      (d) =>
        d.uid === donorId ||
        d.id === donorId ||
        d.firebase_uid === donorId
    );

  const handleSubmit = (status) => {
    completeDonor(request, selectedDonor, status, {
      notes,
      vitals: {
        bloodPressure,
        hemoglobin,
        temperature,
      },
    });

    setSelectedDonor(null);
    setNotes("");
    setBloodPressure("");
    setHemoglobin("");
    setTemperature("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h2 className="text-xl font-bold">
          {request.hospitalName}
        </h2>

        <p className="text-gray-500">
          Blood Type: {request.bloodTypeNeeded} | Units:{" "}
          {request.quantity}
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Donor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {donors.map((d) => {
              const donor = getDonorData(d.donorId);

              return (
                <tr key={d.donorId} className="border-b">
                  <td className="p-3">
                    {donor?.name || "Unknown"}
                  </td>

                  <td>{d.status}</td>

                  <td>
                    <button
                      onClick={() => setSelectedDonor(d)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* REVIEW PANEL */}
      {selectedDonor && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold mb-3">
            Donor Screening
          </h3>

          <div className="grid gap-2">
            <input
              placeholder="Blood Pressure"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Hemoglobin"
              value={hemoglobin}
              onChange={(e) => setHemoglobin(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Temperature"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="border p-2 rounded"
            />

            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleSubmit("Completed")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => handleSubmit("Health_Rejected")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Reject
            </button>

            <button
              onClick={() => setSelectedDonor(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}