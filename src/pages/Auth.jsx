import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire up to your auth logic
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-16">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fuchsia-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-purple-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-100/40 blur-[100px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-3xl border border-purple-100 bg-white/70 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-2xl sm:p-10"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl font-semibold tracking-tight text-purple-950">
            Lumiere
          </span>
          <p className="mt-2 text-sm text-purple-700">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Toggle pill */}
        <div className="relative mb-8 flex rounded-full border border-purple-100 bg-purple-50/60 p-1">
          {["login", "register"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="relative z-10 flex-1 rounded-full py-2 text-sm font-medium transition-colors"
            >
              {mode === m && (
                <motion.span
                  layoutId="authTabIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-fuchsia-400"
                />
              )}
              <span
                className={`relative ${
                  mode === m ? "text-purple-950" : "text-purple-600"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </span>
            </button>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: isLogin ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 12 : -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {!isLogin && (
              <Field
                icon={User}
                type="text"
                name="name"
                placeholder="Full name"
                autoComplete="name"
              />
            )}

            <Field
              icon={Mail}
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
            />

            <Field
              icon={Lock}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-purple-400 transition-colors hover:text-purple-950"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            {!isLogin && (
              <Field
                icon={Lock}
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                autoComplete="new-password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="text-purple-400 transition-colors hover:text-purple-950"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            )}

            {isLogin ? (
              <div className="flex items-center justify-between pt-1 text-sm">
                <label className="flex items-center gap-2 text-purple-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-purple-300 bg-transparent text-fuchsia-500 accent-fuchsia-500"
                  />
                  Remember me
                </label>
                <a
                  href="/forgot-password"
                  className="text-purple-700 transition-colors hover:text-purple-950"
                >
                  Forgot password?
                </a>
              </div>
            ) : (
              <label className="flex items-start gap-2 pt-1 text-sm text-purple-700">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-purple-300 bg-transparent text-fuchsia-500 accent-fuchsia-500"
                />
                <span>
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-purple-950 underline underline-offset-2 hover:text-fuchsia-600"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-purple-950 underline underline-offset-2 hover:text-fuchsia-600"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-950 py-3 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500"
            >
              {isLogin ? "Sign in" : "Create account"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-purple-100" />
          <span className="text-xs text-purple-500">or continue with</span>
          <span className="h-px flex-1 bg-purple-100" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          <SocialButton label="Google" />
          <SocialButton label="Apple" />
        </div>

        {/* Footer switch */}
        <p className="mt-8 text-center text-sm text-purple-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(isLogin ? "register" : "login")}
            className="font-semibold text-purple-950 underline underline-offset-2 hover:text-fuchsia-600"
          >
            {isLogin ? "Register" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

function Field({ icon: Icon, trailing, ...props }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-white/60 px-4 py-3 transition-colors focus-within:border-fuchsia-400 focus-within:ring-2 focus-within:ring-fuchsia-200">
      <Icon className="h-4 w-4 shrink-0 text-purple-400" />
      <input
        {...props}
        required
        className="w-full bg-transparent text-sm text-purple-950 placeholder-purple-400 outline-none"
      />
      {trailing}
    </div>
  );
}

function SocialButton({ label }) {
  return (
    <button
      type="button"
      className="rounded-xl border border-purple-100 bg-white/60 py-2.5 text-sm font-medium text-purple-700 transition-colors hover:border-purple-200 hover:text-purple-950"
    >
      {label}
    </button>
  );
}