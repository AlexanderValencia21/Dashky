"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";

export default function PrivateRoute({
  children,
  loadingComponent = <LoadingSpinner fullScreen />,
}: {
  children: React.ReactNode
  loadingComponent?: React.ReactNode
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking===null) return loadingComponent; // O spinner opcional

  return <>{children}</>;
}
