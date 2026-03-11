"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GradientText from "@/components/GradientText";

export default function Login() {
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
            <Input
            type="email"
            placeholder="Email"
            className="text-sm"
            required
            />
            <Input
            type="password"
            placeholder="Password"
            className="text-sm"
            required
            />
            <Button type="submit" className="w-full">
                Login
            </Button>
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
