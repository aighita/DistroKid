"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GradientText from "@/components/GradientText";
import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginPage() {
    const { email, setEmail, password, setPassword, error, isLoading, handleSubmit } = useLoginForm();

    return (
        <div className="flex flex-col items-center gap-6 lg:justify-start">
            <GradientText
                colors={["#5227FF","#FF9FFC","#B19EEF"]}
                animationSpeed={25}
                showBorder={false}
                className="text-6xl font-bold"
            >
                DistroKid
            </GradientText>
            <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md bg-background px-6 py-8">
                <h1 className="text-xl font-semibold">Welcome back</h1>
                
                {error && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="text-sm"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className="text-sm"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </div>
            <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
                <p>Don't have an account?</p>
                <Link href="/register" className="text-blue-600 hover:underline">
                    Register
                </Link>
            </div>
        </div>
    );
}
