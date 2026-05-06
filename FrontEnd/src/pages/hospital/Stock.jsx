import { useState } from "react";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { useHospitalData } from "../../Hooks/useHospitalData";
import { toast } from "react-toastify";

import StockHeader from "../../components/stock/StockHeader";
import StockGrid from "../../components/stock/StockGrid";
import StockControl from "../../components/stock/StockControl";
import ExpiringStock from "../../components/stock/ExpiringStock";

export default function StockPage() {
  const { data: user, authLoading } = useAuthUser();

  const hospitalId = user?.profileId || user?.id;
 const { expiringStock } = useHospitalData(hospitalId);
  const { bloodStock, updateStock, loading } = useHospitalData(hospitalId);

  const [selectedType, setSelectedType] = useState("");
  const [units, setUnits] = useState("");
  const [mode, setMode] = useState("add");

    if (loading || authLoading)
      return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Loading....
          </p>
        </div>
      );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStock(hospitalId, selectedType, Number(units), mode);

      toast.success("Stock updated successfully ");
      setSelectedType("");
      setUnits("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen p-8 mt-10 md:mt-0">
      <StockHeader />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <StockGrid bloodStock={bloodStock} />

        <StockControl
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          units={units}
          setUnits={setUnits}
          mode={mode}
          setMode={setMode}
          handleSubmit={handleSubmit}
        />
      </div>
      <ExpiringStock expiringStock={expiringStock} />
    </div>
  );
}
