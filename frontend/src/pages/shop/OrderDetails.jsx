import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";

const OrderDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    deliveryMethodId: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [basketId, setBasketId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchDeliveryMethods = async () => {
    try {
      const res = await fetch("http://waseet.runasp.net/api/Order/deliveryMethods");
      const data = await res.json();
      setDeliveryMethods(data);

      if (data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          deliveryMethodId: data[0].id,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch delivery methods", err);
    }
  };

  const fetchBasketId = async () => {
    try {
      const res = await fetch("http://waseet.runasp.net/api/Cart/basket/id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch basket");
      }
      const data = await res.text();
      setBasketId(data);
      localStorage.setItem("basketId", data);
    } catch (err) {
      console.error("Failed to fetch basket id", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    localStorage.setItem("shippingInfo", JSON.stringify(formData));

    try {
      await fetch(
        `http://waseet.runasp.net/api/Cart/basket/delivery-method?deliveryMethodId=${formData.deliveryMethodId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ انتقل مباشرة إلى صفحة الدفع
      navigate("/payment");
    } catch (err) {
      setError("فشل تحديث وسيلة التوصيل. حاول لاحقًا.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      fetchDeliveryMethods();
      fetchBasketId();
    }
  }, [token]);

  return (
    <div className="pt-24 px-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-center mb-4">
          Shipping Information
        </h2>

        {["firstName", "lastName", "phone", "country", "city", "street"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
          />
        ))}

        <select
          required
          name="deliveryMethodId"
          value={formData.deliveryMethodId}
          onChange={handleChange}
          className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
        >
          {deliveryMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.shortName} (${method.cost})
            </option>
          ))}
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || !basketId}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark w-full"
        >
          {loading ? <Loading size="small" /> : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
};

export default OrderDetails;
