// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Home, User } from "lucide-react";
// import { useNotification } from "./Notification";

// export default function Header() {
//   const { data: session } = useSession();
//   const { showNotification } = useNotification();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       showNotification("Signed out successfully", "success");
//     } catch {
//       showNotification("Failed to sign out", "error");
//     }
//   };

//   return (
//     <div className="navbar bg-base-300 sticky top-0 z-40">
//       <div className="container mx-auto">
//         <div className="flex-1 px-2 lg:flex-none">
//           <Link
//             href="/"
//             className="btn btn-ghost text-xl gap-2 normal-case font-bold"
//             prefetch={true}
//             onClick={() =>
//               showNotification("Welcome to ImageKit ReelsPro", "info")
//             }
//           >
//             <Home className="w-5 h-5" />
//             ImageKit ReelsPro
//           </Link>
//         </div>
//         <div className="flex flex-1 justify-end px-2">
//           <div className="flex items-stretch gap-2">
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle"
//               >
//                 <User className="w-5 h-5" />
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
//               >
//                 {session ? (
//                   <>
//                     <li className="px-4 py-1">
//                       <span className="text-sm opacity-70">
//                         {session.user?.email?.split("@")[0]}
//                       </span>
//                     </li>
//                     <div className="divider my-1"></div>

//                     <li>
//                       <Link
//                         href="/upload"
//                         className="px-4 py-2 hover:bg-base-200 block w-full"
//                         onClick={() =>
//                           showNotification("Welcome to Admin Dashboard", "info")
//                         }
//                       >
//                         Video Upload
//                       </Link>
//                     </li>

//                     <li>
//                       <button
//                         onClick={handleSignOut}
//                         className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
//                       >
//                         Sign Out
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <li>
//                     <Link
//                       href="/login"
//                       className="px-4 py-2 hover:bg-base-200 block w-full"
//                       onClick={() =>
//                         showNotification("Please sign in to continue", "info")
//                       }
//                     >
//                       Login
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//seond snippet

"use client";

import { useState ,useEffect} from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };


  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
      setIsDropdownOpen(false); // Close dropdown
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar bg-gray-900 text-gray-100 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center btn btn-ghost text-xl gap-2 normal-case font-bold text-white"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <Home className="w-5 h-5" />
            ReelsPro
          </Link>
        </div>

        {/* User Section */}
        <div className="relative flex items-center gap-4">
          <div
            role="button"
            className="btn btn-ghost btn-circle text-white"
            onClick={toggleDropdown}
          >
            <User className="w-6 h-6" />
          </div>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 shadow-lg bg-gray-800 text-gray-100 rounded-box w-64 py-2">
              {session ? (
                <>
                  <li className="px-4 py-1">
                    <span className="text-sm opacity-70">
                      {session.user?.email?.split("@")[0]}
                    </span>
                  </li>
                  <div className="divider my-1"></div>

                  <li>
                    <Link
                      href="/upload"
                      className="px-4 py-2 hover:bg-gray-700 block w-full  items-center gap-2"
                      onClick={() => {
                        showNotification("Welcome to Admin Dashboard", "info");
                        toggleDropdown(); // Close dropdown
                      }}
                    >
                      Video Upload
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        handleSignOut();
                        toggleDropdown();
                      }}
                      className="px-4 py-2 text-error hover:bg-gray-700 w-full text-left flex items-center gap-2"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="px-4 py-2 hover:bg-gray-700 block w-full  items-center gap-2"
                    onClick={() => {
                      showNotification("Please sign in to continue", "info");
                      toggleDropdown() // Close dropdown
                    }}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        {/* toggle button */}
        <button
      onClick={toggleTheme}
      className="p-2 bg-gray-800 text-white rounded"
    >
      Toggle Theme
    </button>
        </div>

      </div>
    </div>
  );
}