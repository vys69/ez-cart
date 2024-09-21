"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Privacy() {
    const router = useRouter()

    const handleGoBack = () => {
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-[#0e0e0e] p-6 rounded-lg text-center max-w-sm w-full">
                <h1 className="text-white text-2xl font-bold mb-4">terms of service</h1>
                <p className="text-gray-300 mb-6">
                   nothing to see here, just go shop lol
                </p>
                <Button 
                    onClick={handleGoBack}
                    className="w-full bg-white text-black hover:bg-gray-200"
                >
                    go back
                </Button>
            </div>
        </div>
    )
}