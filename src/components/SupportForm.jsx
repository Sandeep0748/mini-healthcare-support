import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function SupportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
    urgency: "",
    preferredContact: "Email",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const draft = localStorage.getItem("support_form_draft");
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
      } catch {}
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(updated);
    localStorage.setItem("support_form_draft", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.issue) newErrors.issue = "Select issue type";
    if (!formData.urgency) newErrors.urgency = "Select urgency";
    if (!formData.message.trim())
      newErrors.message = "Describe your request";
    if (!formData.consent) newErrors.consent = "Consent required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      toast.error("Please fix form errors");
      return;
    }

    setSummary({
      title: `${formData.issue} • ${formData.urgency}`,
      lines: [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.phone ? `Phone: ${formData.phone}` : null,
        `Preferred Contact: ${formData.preferredContact}`,
        `Message: ${formData.message}`,
      ].filter(Boolean),
    });

    toast.success("Support request submitted successfully ✅");

    localStorage.removeItem("support_form_draft");

    setFormData({
      name: "",
      email: "",
      phone: "",
      issue: "",
      urgency: "",
      preferredContact: "Email",
      message: "",
      consent: false,
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-1">
        🩺 Support & Registration
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Patient support, volunteer registration & general queries
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}

        <input
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Issue Type</option>
          <option>Patient Support</option>
          <option>Volunteer Registration</option>
          <option>General Inquiry</option>
        </select>

        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Urgency</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <textarea
          name="message"
          rows="3"
          placeholder="Describe your request"
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          I consent to data processing
        </label>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
          Submit Request
        </button>
      </form>

      {summary && (
        <div className="mt-6 bg-blue-50 p-4 rounded-xl">
          <h3 className="font-semibold text-blue-700 mb-2">
            Auto-generated Summary
          </h3>
          <p className="text-sm font-medium mb-1">{summary.title}</p>
          <ul className="list-disc pl-5 text-sm">
            {summary.lines.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SupportForm;
