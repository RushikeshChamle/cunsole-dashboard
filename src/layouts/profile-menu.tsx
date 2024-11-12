// 'use client';

// import { Title, Text, Avatar, Button, Popover } from 'rizzui';
// import cn from '@utils/class-names';
// import { routes } from '@/config/routes';
// import { signOut } from 'next-auth/react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../app/AuthContext';

// import Cookies from 'js-cookie';
// import { toast } from 'react-hot-toast';

// export default function ProfileMenu({


//   buttonClassName,
//   avatarClassName,
//   username = false,
// }: {
//   buttonClassName?: string;
//   avatarClassName?: string;
//   username?: boolean;
// }) 






// {
//   return (
//     <ProfileMenuPopover>
//       <Popover.Trigger>
//         <button
//           className={cn(
//             'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
//             buttonClassName
//           )}
//         >
//           <Avatar
//             src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
//             name="John Doe"
//             className={cn('!h-9 w-9 sm:!h-10 sm:!w-10', avatarClassName)}
//           />
//           {!!username && (
//             <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
//               Hi, Andry
//             </span>
//           )}
//         </button>
//       </Popover.Trigger>

//       <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
//         <DropdownMenu />
//       </Popover.Content>
//     </ProfileMenuPopover>
//   );
// }

// function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   return (
//     <Popover
//       isOpen={isOpen}
//       setIsOpen={setIsOpen}
//       shadow="sm"
//       placement="bottom-end"
//     >
//       {children}
//     </Popover>
//   );
// }

// const menuItems = [
//   {
//     name: 'My Profile',
//     href: routes.profile,
//   },
//   {
//     name: 'Account Settings',
//     href: routes.forms.profileSettings,
//   },
//   {
//     name: 'Activity Log',
//     href: '#',
//   },
// ];

// function DropdownMenu() {
//   const router = useRouter();

//   // const handleSignOut = async () => {
//   //   // Clear the JWT tokens from cookies
//   //   Cookies.remove('access_token');
//   //   Cookies.remove('refresh_token');

//   //   try {
//   //     // Sign out using next-auth
//   //     await signOut({ redirect: false });

//   //     // Redirect to the login page
//   //     router.push('/auth/sign-in-4');
//   //   } catch (error) {
//   //     console.error('Error during sign out:', error);
//   //     // Fallback: force redirect even if there's an error
//   //     window.location.href = '/auth/sign-in-4';
//   //   }
//   // };

//   const handleSignOut = async () => {
//     try {
//       // Clear the JWT tokens from cookies
//       Cookies.remove('access_token');
//       Cookies.remove('refresh_token');
  
//       // Sign out using next-auth
//       await signOut({ redirect: false });
  
//       // Show success toast
//       toast.success('Signed out successfully', {
//         duration: 2000,
//         position: 'top-center',
//       });
  
//       // Redirect to the login page after a short delay
//       setTimeout(() => {
//         router.push('/auth/signin');
//       }, 2000);
//     } catch (error) {
//       console.error('Error during sign out:', error);
      
//       // Show error toast
//       toast.error('Error signing out. Redirecting to login page.', {
//         duration: 3000,
//         position: 'top-center',
//       });
  
//       // Redirect to login page even if there's an error, but with a longer delay
//       setTimeout(() => {
//         router.push('/auth/signin');
//       }, 3000);
//     }
//   };


//   return (
//     <div className="w-64 text-left rtl:text-right">
//       <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
//         <Avatar
//           src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
//           name="Albert Flores"
//         />
//         <div className="ms-3">
//           <Title as="h6" className="font-semibold">
//             Albert Flores
//           </Title>
//           <Text className="text-gray-600">flores@doe.io</Text>
//         </div>
//       </div>
//       <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
//         {menuItems.map((item) => (
//           <Link
//             key={item.name}
//             href={item.href}
//             className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>
//       <div className="border-t border-gray-300 px-6 pb-6 pt-5">
//         <Button
//           className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
//           variant="text"
//           onClick={handleSignOut}
//         >
//           Sign Out
//         </Button>
//       </div>
//     </div>
//   );
// }




'use client';

import { Title, Text, Avatar, Button, Popover } from 'rizzui';
import cn from '@utils/class-names';
import { routes } from '@/config/routes';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/AuthContext'; // Import useAuth hook for user details

import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const { user } = useAuth(); // Access user details from AuthContext
  
  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp" // Placeholder image
            name={user ? user.users[0].name : "User"} // Display user's name if available
            className={cn('!h-9 w-9 sm:!h-10 sm:!w-10', avatarClassName)}
          />
          {!!username && user && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, {user.users[0].name}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  // {
  //   name: 'My Profile',
  //   href: routes.profile,
  // },
  {
    name: 'Account Settings',
    href: routes.forms.profileSettings,
  },
  {
    name: 'Activity Log',
    href: '#',
  },
];

function DropdownMenu() {
  const router = useRouter();
  const { user } = useAuth(); // Use user details for the DropdownMenu content

  const handleSignOut = async () => {
    try {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
  
      await signOut({ redirect: false });
  
      toast.success('Signed out successfully', {
        duration: 2000,
        position: 'top-center',
      });
  
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } catch (error) {
      console.error('Error during sign out:', error);
      
      toast.error('Error signing out. Redirecting to login page.', {
        duration: 3000,
        position: 'top-center',
      });
  
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    }
  };

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp" // Placeholder image
          name={user ? user.users[0].name : "Albert Flores"}
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {user ? user.users[0].name : "Albert Flores"}
          </Title>
          <Text className="text-gray-600">{user ? user.users[0].email : "flores@doe.io"}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
