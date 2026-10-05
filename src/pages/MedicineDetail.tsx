import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMedicineById,
} from "../services/fdaApi";
import type { Medicine } from "../types/medicine";

function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] =
    useState<Medicine | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Medicine not found.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadMedicine = async () => {
      try {
        const data = await getMedicineById(id, controller.signal);
        if (!data) {
          setError("Medicine not found.");
          return;
        }

        setMedicine(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(
            "Unable to load medicine details."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadMedicine();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <div className="state">
          <p>Loading medicine details...</p>
        </div>
      </main>
    );
  }

  if (error || !medicine) {
    return (
      <main className="container">
        <div className="state error">
          <h2>{error || "Medicine not found."}</h2>

          <button onClick={() => navigate("/")}>
            Back to search
          </button>
        </div>
      </main>
    );
  }

  const openfda = medicine.openfda;

  return (
    <main className="container">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back to results
      </button>

      <article className="detail-card">
        <h1>
          {openfda?.brand_name?.[0] ??
            "Unknown medicine"}
        </h1>

        <div className="detail-grid">
          <div>
            <strong>Generic Name</strong>
            <p>
              {openfda?.generic_name?.join(", ") ??
                "Not available"}
            </p>
          </div>

          <div>
            <strong>Manufacturer</strong>
            <p>
              {openfda?.manufacturer_name?.join(", ") ??
                "Not available"}
            </p>
          </div>

          <div>
            <strong>Product Type</strong>
            <p>
              {openfda?.product_type?.join(", ") ??
                "Not available"}
            </p>
          </div>

          <div>
            <strong>Route</strong>
            <p>
              {openfda?.route?.join(", ") ??
                "Not available"}
            </p>
          </div>

          <div>
            <strong>Substance</strong>
            <p>
              {openfda?.substance_name?.join(", ") ??
                "Not available"}
            </p>
          </div>

          <div>
            <strong>Application Number</strong>
            <p>
              {openfda?.application_number?.join(", ") ??
                "Not available"}
            </p>
          </div>
        </div>

        {medicine.purpose?.[0] && (
          <section>
            <h2>Purpose</h2>
            <p>{medicine.purpose[0]}</p>
          </section>
        )}

        {medicine.indications_and_usage?.[0] && (
          <section>
            <h2>Indications & Usage</h2>
            <p>
              {medicine.indications_and_usage[0]}
            </p>
          </section>
        )}

        {medicine.warnings?.[0] && (
          <section>
            <h2>Warnings</h2>
            <p>{medicine.warnings[0]}</p>
          </section>
        )}

        {medicine.dosage_and_administration?.[0] && (
          <section>
            <h2>Dosage & Administration</h2>
            <p>
              {medicine.dosage_and_administration[0]}
            </p>
          </section>
        )}
      </article>
    </main>
  );
}

export default MedicineDetail;