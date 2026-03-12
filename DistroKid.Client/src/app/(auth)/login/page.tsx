"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GradientText from "@/components/GradientText";

import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Authorization/Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

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
            <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-mdbg-background px-6 py-8">
                <h1 className="text-xl font-semibold">Welcome back</h1>
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="text-sm"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        className="text-sm"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </div>
            <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
                <p>Don't have an account?</p>
                <Button
                    variant="link"
                    onClick={() => window.location.href = "/register"}
                    className="cursor-pointer"
                >
                Register
                </Button>
            </div>
        </div>
  );
}
