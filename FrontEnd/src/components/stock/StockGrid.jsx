import StockCard from "./StockCard";

export default function StockGrid({ bloodStock }) {
  return (
    <div className="lg:col-span-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => {
          const stock = bloodStock?.find((s) => s.bloodType === type);

          return <StockCard key={type} type={type} stock={stock} />;
        })}
      </div>
    </div>
  );
}
