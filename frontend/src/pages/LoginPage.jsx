import { useState } from "react";
import { MessageSquare, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const LoginPage = () => {
  // STATES
  const { login } = useAuthStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // FUNCTIONS
  const handleSignIn = async (formdata) => {
    const email = formdata.get("email");
    const password = formdata.get("password");
    const userInput = { email, password };
    login(userInput);
  };

  // MAIN UI
  return (
    <div className="min-h-screen max-h-screen grid lg:grid-cols-2">
      {/* left half */}
      <section className="flex justify-center items-center">
        <div className="w-[75%] sm:w-[90%] max-w-lg">
          <div className="flex flex-col gap-8">
            {/* left top half */}
            <div className="flex flex-col justify-center items-center">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
            {/* left bottom half */}
            <form action={handleSignIn} className="space-y-4 flex flex-col">
              <div>
                <label htmlFor="email">Email</label>
                <div className="relative">
                  <Mail className="absolute left-1.5 top-1.5 z-40" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="John@gmail.com"
                    name="email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <Lock className="left-1.5 top-1.5 absolute z-40" />
                  <input
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="**********"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-base-content/40" />
                    ) : (
                      <Eye className="h-5 w-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="rounded-b-sm bg-yellow-600 px-10 py-2 mt-4 text-black font-semibold cursor-pointer"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <div className="text-center">
              <div className="flex gap-1 text-base-content/60">
                <p>Don't have an account</p>
                <Link to="/signup" className="link link-primary">
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Right half */}
      <section className="self-center mt-3.5">
        <AuthImagePattern
          title="Welcome Back"
          subtitle="Sign in to continue your conversations and catch up with your latest messages"
        />
      </section>
    </div>
  );
};

export default LoginPage;
