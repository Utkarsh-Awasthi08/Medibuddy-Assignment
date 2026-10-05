import type { Medicine } from "../types/medicine";

interface MedicineCardProps {
  medicine: Medicine;
  onClick: () => void;
}

function MedicineCard({
  medicine,
  onClick,
}: MedicineCardProps) {
  const openfda = medicine.openfda;

  return (
    <div className="medicine-card" onClick={onClick} style={{border: "2px solid black"}}>
      <h2>
        {openfda?.brand_name?.[0] ?? "Unknown brand"}
      </h2>

      <p>
        <strong>Generic:</strong>{" "}
        {openfda?.generic_name?.[0] ?? "Not available"}
      </p>

      <p>
        <strong>Manufacturer:</strong>{" "}
        {openfda?.manufacturer_name?.[0] ?? "Not available"}
      </p>

      <p>
        <strong>Product Type:</strong>{" "}
        {openfda?.product_type?.[0] ?? "Not available"}
      </p>

      <p>
        <strong>Route:</strong>{" "}
        {openfda?.route?.[0] ?? "Not available"}
      </p>

      <span className="view-details">
        View details →
      </span>
    </div>
  );
}

export default MedicineCard;