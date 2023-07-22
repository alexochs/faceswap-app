import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { ScanFace } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export default async function Navbar() {
    const user = await currentUser();

    return (
        <nav className="flex w-full justify-between items-center py-4 sm:py-8 px-4 sm:px-16">
            <Link href="/" className="flex gap-2 items-center">
                <ScanFace className="w-8 h-8" />
                <p className="font-bold text-xl">FaceSwap</p>
            </Link>
            {user ? <UserButton afterSignOutUrl="/" /> : <div className={buttonVariants()}><SignInButton /></div>}
        </nav>
    );
}