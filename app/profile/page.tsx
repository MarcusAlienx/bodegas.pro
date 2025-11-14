"use client";
import withAuth from "@/app/components/auth/withAuth";
import { useAuth } from "@/app/hooks/useAuth";
import { useFirestore } from "@/app/hooks/useFirestore";
import { User } from "@/app/models/user";
import { useEffect, useState } from "react";

function ProfilePage() {
  const { user } = useAuth();
  const { getDocument } = useFirestore();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      getDocument<User>("users", user.uid).then(setUserData);
    }
  }, [user, getDocument]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold text-center">Profile</h1>
        {userData ? (
          <div>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Name:</strong> {userData.displayName}</p>
            <p><strong>Phone:</strong> {userData.phoneNumber}</p>
            <p><strong>Phone Verified:</strong> {userData.phoneVerified ? "Yes" : "No"}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
