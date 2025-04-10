import { MessageSquare, User, Lock, Mail } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const handleSubmit = (formdata) => {
    const name = formdata.get("name");
    const email = formdata.get("email");
    const password = formdata.get("password");
    console.log(name, email, password);
  };
  return (
    <div className="min-h-screen max-h-screen overflow-hidden grid lg:grid-cols-2">
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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started with your free account
              </p>
            </div>
            {/* left bottom half */}
            <form action={handleSubmit} className="space-y-4 flex flex-col">
              <div>
                <label htmlFor="name">Full Name</label>
                <div className="relative">
                  <User className="left-1.5 top-1.5 absolute z-40 " />
                  <input
                    className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    required
                  />
                </div>
              </div>
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
                    type="password"
                    name="password"
                    required
                  />
                </div>
              </div>
              <button className="rounded-b-sm  bg-yellow-600 px-10 py-2 mt-4 text-black font-semibold">
                Create Account
              </button>
            </form>
            <div className="text-center">
              <div className="text-base-content/60">
                <p>Already have an account?</p>
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Right half */}
      <section>
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </section>
    </div>
  );
};

export default SignupPage;
