import { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const FIELDS = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Jane Cooper",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "jane@company.com",
  },
  {
    id: "subject",
    label: "Subject",
    type: "text",
    placeholder: "How can we help?",
  },
];

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please enter a subject.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must contain at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    const updated = {
      ...values,
      [field]: value,
    };

    setValues(updated);

    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate(values);

    setErrors(validation);

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.keys(validation).length) return;

    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");

      setValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="flex min-h-screen items-center justify-center bg-brand-50 px-6 py-20 dark:bg-brand-950">
        <div className="w-full max-w-lg rounded-3xl border border-brand-200 bg-white p-10 text-center shadow-xl dark:border-brand-800 dark:bg-brand-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>

          <h2 className="mt-6 font-serif text-3xl font-semibold text-brand-950 dark:text-brand-50">
            Message Sent!
          </h2>

          <p className="mt-3 text-brand-600 dark:text-brand-300">
            Thank you for contacting us. Our team will respond within one
            business day.
          </p>

          <button
            onClick={() => setStatus("idle")}
            className="mt-8 rounded-xl bg-brand-950 px-6 py-3 font-semibold text-white transition hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600"
          >
            Send Another Message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-50 py-20 dark:bg-brand-950">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">
            Contact Us
          </span>

          <h1 className="mt-4 font-serif text-5xl font-semibold text-brand-950 dark:text-brand-50">
            We'd Love to Hear From You
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-brand-600 dark:text-brand-300">
            Whether you have a question about our collections, your order,
            partnerships, or simply want to say hello, send us a message and
            we'll get back to you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-brand-200 bg-white p-8 shadow-xl dark:border-brand-800 dark:bg-brand-900"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {FIELDS.map(({ id, label, type, placeholder }) => (
              <div
                key={id}
                className={id === "subject" ? "md:col-span-2" : ""}
              >
                <label
                  htmlFor={id}
                  className="mb-2 block text-sm font-semibold text-brand-700 dark:text-brand-200"
                >
                  {label}
                </label>

                <input
                  id={id}
                  type={type}
                  value={values[id]}
                  onChange={handleChange(id)}
                  onBlur={handleBlur(id)}
                  placeholder={placeholder}
                  className={`w-full rounded-xl border px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-brand-950 dark:text-brand-50 dark:placeholder:text-brand-500 ${
                    touched[id] && errors[id]
                      ? "border-red-500"
                      : "border-brand-300 dark:border-brand-700"
                  }`}
                />

                {touched[id] && errors[id] && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors[id]}
                  </p>
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-brand-700 dark:text-brand-200"
              >
                Message
              </label>

              <textarea
                id="message"
                rows={6}
                value={values.message}
                onChange={handleChange("message")}
                onBlur={handleBlur("message")}
                placeholder="Tell us how we can help..."
                className={`w-full resize-none rounded-xl border px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-brand-950 dark:text-brand-50 dark:placeholder:text-brand-500 ${
                  touched.message && errors.message
                    ? "border-red-500"
                    : "border-brand-300 dark:border-brand-700"
                }`}
              />

              {touched.message && errors.message && (
                <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {status === "error" && (
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-5 w-5" />
              Something went wrong. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}