"use client";
import { useAuth } from "@/app/hooks/useAuth";
import withAuth from "@/app/components/auth/withAuth";
import { PhoneVerification } from "@/app/components/auth/PhoneVerification";
import { useRouter } from "next/navigation";

function VerifyPhonePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleSuccess = () => {
    router.push("/profile");
  };

  if (loading) {
    return <div>Loading user...</div>;
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <PhoneVerification user={user} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default withAuth(VerifyPhonePage);
