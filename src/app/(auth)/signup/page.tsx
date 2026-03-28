import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-gray-500 mt-2">
            Start tracking your trades and performance.
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}