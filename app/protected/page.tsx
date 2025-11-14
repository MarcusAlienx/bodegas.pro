"use client";
import withAuth from "@/app/components/auth/withAuth";

function ProtectedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-2xl font-bold text-white">Protected Page</h1>
    </div>
  );
}

export default withAuth(ProtectedPage);
