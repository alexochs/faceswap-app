import { ScanFace } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <footer className="flex w-full justify-between items-center py-4 sm:py-8 px-4 sm:px-16">
            <div className="flex gap-2 items-center">
                <ScanFace className="w-6 h-6" />
                <span className="text-sm">
                    Built by&nbsp;
                    <Link href="https://twitter.com/gyanendralucky" target="_blank" className="font-medium underline hover:cursor-pointer">Gyanendra</Link>
                    &nbsp;&&nbsp;
                    <Link href="https://instagram.com/ochs.software" target="_blank" className="font-medium underline hover:cursor-pointer">Alex.</Link>
                </span>
            </div>
        </footer>
    );
}