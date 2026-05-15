"use client";

import { ArrowRight, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { AlertTriangleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import Image from "next/image";

export default function AuthFormCard({
  redirectTo,
  msg,
}: {
  redirectTo: string;
  msg: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL not defined");
      }

      const url = `${backendUrl}/api/auth/google?redirectTo=${redirectTo}`;

      window.location.href = url;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sign in with Google"
      );

      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 relative h-16 w-16 items-center justify-center  ">
            <Image
                            src={'/logo/buyam.png'}
                            fill
                            className="w-16 h-16 absolute lg:w-16 lg:h-16 absolute"
                            alt="logo"
                          />
          </div>

          {msg ? (
            <Alert className="border-amber-200 bg-amber-50/90 text-amber-900 backdrop-blur-sm">
              <AlertTriangleIcon className="h-4 w-4" />

              <AlertTitle className="font-semibold">
                Authentication Required
              </AlertTitle>

              <AlertDescription className="mt-1 text-xs leading-relaxed text-amber-800">
                You need to sign in to continue. After authentication, you’ll
                automatically return to this page.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Continue securely with Google to access your account and manage
                your experience seamlessly.
              </p>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="space-y-4">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-4 font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <svg
                  className="relative z-10 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>

                <span className="relative z-10">
                  Continue with Google
                </span>
              </>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Preparing your account...</span>
              </>
            ) : (
              <>
                <span>Get Started Instantly</span>

                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Footer */}
        <div className=" border-t border-gray-100 pt-6">
          
              <p className="text-xs leading-relaxed text-gray-600">
                Your authentication is handled securely through Google OAuth.
                Passwords are never stored on our servers.
              </p>
         
         

          <p className="mt-5 text-center text-[11px] leading-relaxed text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}