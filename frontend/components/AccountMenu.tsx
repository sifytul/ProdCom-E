import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Box,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { useAppDispatch } from "@/store";
import Image from "next/image";
import { useLogoutMutation } from "@/store/slices/apiSlice";

export function AccountMenu({ user }) {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout(undefined);
  };

  let userMenu = user ? (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Box className="mr-2 h-4 w-4" />
        <span>My Orders</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  ) : (
    <DropdownMenuGroup>
      <Link href={"/auth/signup"}>
        <DropdownMenuItem>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Sign Up</span>
        </DropdownMenuItem>
      </Link>
      <Link href={"/auth/signin"}>
        <DropdownMenuItem>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Sign In</span>
        </DropdownMenuItem>
      </Link>
    </DropdownMenuGroup>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          {user ? (
            <Image
              height={32}
              width={32}
              src={user.avatar}
              alt="user avatar"
              className="h-8 w-8 rounded-full hover:scale-110 duration-200"
            />
          ) : (
            <BsPerson className="hover:scale-110 duration-200" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenu}
        <DropdownMenuSeparator />
        <Link href={"https://github.com/sifytul/prodcom-e"}>
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <Link href={`${process.env.NEXT_PUBLIC_BACKEND_API}`}>
          <DropdownMenuItem>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {user && (
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
