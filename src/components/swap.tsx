"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Loader, ScanFace } from "lucide-react";

export default function Swap() {
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSourceChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) {
            alert("Invalid source image");
            setSource("");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSource(e.target?.result as string);
        }
        reader.readAsDataURL(file);
    }

    function handleTargetChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) {
            alert("Invalid target image");
            setTarget("");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setTarget(e.target?.result as string);
        }
        reader.readAsDataURL(file);
    }

    async function swap() {
        if (!source || !target) {
            alert("Invalid source or target image");
            return;
        }

        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify({
                source_image: source.split(',')[1],
                target_image: target.split(',')[1],
                model: "gfpgan_codeformer",
                task: "swapping",
            }),
        };

        try {
            const response = await fetch("https://49or1gezx7.execute-api.ap-south-1.amazonaws.com/default/iris", requestOptions);
            const result = await response.json();
            console.log(result);
            if (result.image) {
                setResult('data:image/JPEG;base64,' + result.image);
                setLoading(false);
            } else {
                setLoading(false);
                throw new Error(result.error);
            }
        } catch (error: any) {
            setLoading(false);
            console.error(error);
            alert('An error occurred while calling the API: ' + error.message || 'Unknown error');
        }
    }

    return (
        <div className="flex flex-col gap-8 justify-center max-w-xl">
            <div className="flex flex-col items-start justify-center gap-8 sm:flex-row">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="source">Face (Source)</Label>
                    <Input
                        id="source"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleSourceChange}
                        className="hover:cursor-pointer"
                    />
                    {source && <img src={source} alt="source image" className="rounded-lg" />}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="target">Scene (Target)</Label>
                    <Input
                        id="target"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleTargetChange}
                        className="hover:cursor-pointer"
                    />
                    {target && <img src={target} alt="target image" className="rounded-lg" />}
                </div>
            </div>

            <Button
                size="lg"
                onClick={swap}
                disabled={loading}
            >
                {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <ScanFace className="mr-2 h-4 w-4" />}
                <span>Swap</span>
            </Button>

            {
                (loading || result) && <div className="mt-8 flex flex-col gap-4">
                    <h2 className="text-center font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Result
                    </h2>
                    {loading ?
                        <Skeleton className="aspect-square w-full rounded-lg" /> :
                        result && <img src={result} alt="result image" className="rounded-lg" />}
                </div>
            }
        </div >
    );
}