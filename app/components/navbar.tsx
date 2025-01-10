'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { SignInButton, useAuth, useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Trees, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
 import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

 export const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = ['explore', 'journey', 'craft', 'chat'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted || !isLoaded) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'explore', label: 'Explore Poetry' },
    { id: 'journey', label: 'Poetic Journey' },
    { id: 'craft', label: 'Master the Craft' },
    { id: 'chat', label: 'Creative Space' },
  ];

  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          onClick={() => {
            scrollToSection(item.id);
            onItemClick?.();
          }}
          className={`w-full justify-start text-lg font-medium transition-all duration-200 
            ${activeSection === item.id
              ? 'text-emerald-600 bg-gradient-to-r from-emerald-50 to-emerald-100/80 shadow-sm'
              : 'text-gray-600 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-transparent'
            } rounded-lg px-4 py-6 backdrop-blur-sm`}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <div className="fixed w-full top-0 z-50">
      <nav className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between md:justify-start">
            {/* Logo */}
            <div className="flex-1 flex md:flex-none">
              <Link
                href="/"
                className="mx-auto md:mx-0 flex items-center space-x-2 hover:opacity-90 transition-opacity bg-gradient-to-r from-white to-gray-50 px-3 py-1.5 rounded-lg shadow-sm"
              >
                <Trees className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">
                  Garden
                  <span className="text-gray-500 mx-1">of</span>
                  <span className="text-emerald-600">Words</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 mx-8 flex-1 justify-center">
              <NavLinks />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-emerald-50/50 rounded-lg shadow-sm"
                  >
                    <Menu className="h-6 w-6 text-gray-600" />
                  </Button>
                </SheetTrigger>
                <SheetContent
  side="right"
  className="w-full sm:max-w-sm p-6"
  style={{
    backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
  }}
>
  <DialogTitle className="sr-only">Menu</DialogTitle>
  <DialogDescription className="sr-only">
    Navigate through the menu options.
  </DialogDescription>
  <div className="flex flex-col space-y-2 mt-8">
    <NavLinks   
      onItemClick={() => {
        const closeButton = document.querySelector(
          '[data-state="open"]'
        ) as HTMLButtonElement;
        closeButton?.click();
      }}
    />
  </div>
  <div className="absolute bottom-6 left-6 right-6">
    <div className="flex justify-center">
      {isSignedIn ? (
        <Button
          onClick={handleSignOut}
          className="w-full font-medium bg-gradient-to-r from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 text-rose-600 border border-rose-200 shadow-sm transition-all duration-200"
        >
          Sign out
        </Button>
      ) : (
        <SignInButton mode="modal">
          <Button
            className="w-full font-medium bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 text-emerald-600 border border-emerald-200 shadow-sm transition-all duration-200"
          >
            Sign in
          </Button>
        </SignInButton>
      )}
    </div>
  </div>
</SheetContent>

              </Sheet>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center">
              {isSignedIn ? (
                <Button
                  onClick={handleSignOut}
                  className="font-medium bg-gradient-to-r from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 text-rose-600 border border-rose-200 shadow-sm transition-all duration-200"
                >
                  Sign out
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button
                    className="font-medium bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 text-emerald-600 border border-emerald-200 shadow-sm transition-all duration-200"
                  >
                    Sign in
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </div>
  );
};

export default Navbar;