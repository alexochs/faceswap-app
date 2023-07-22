import { ScanFace } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="flex w-full justify-between items-center py-4 sm:py-8 px-4 sm:px-16">
            <div className="flex gap-2 items-center">
                <ScanFace className="w-8 h-8" />
                <p className="font-bold text-xl">FaceSwap</p>
            </div>
        </nav>
    );
}