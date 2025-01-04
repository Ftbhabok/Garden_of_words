'use client';

import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { SignInButton, SignOutButton, useAuth, useClerk } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until the component is mounted and auth is loaded
  if (!mounted || !isLoaded) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/"); // Redirect to home page after sign out
      router.refresh(); // Refresh the page to update the auth state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-gray-500 backdrop-blur-lg transition-all">

     <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            Garden<span className="text-emerald-600">Words</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={handleSignOut}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button size="sm" variant="ghost">
                    Sign in
                  </Button>
                </SignInButton>

                {/* <div className="h-8 w-px bg-gray-200" /> */}

                {/* <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1.5",
                  })}
                >
                  Sign up
                </Link> */}
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};