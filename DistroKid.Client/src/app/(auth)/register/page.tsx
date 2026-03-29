"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GradientText from "@/components/GradientText";
import Link from "next/link";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterPage() {
    const { formData, handleChange, error, isLoading, handleSubmit } = useRegisterForm();

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center gap-6 px-4">
            <GradientText
                colors={["#5227FF","#FF9FFC","#B19EEF"]}
                animationSpeed={25}
                showBorder={false}
                className="text-6xl font-bold"
            >
                DistroKid
            </GradientText>
            <div className="flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md bg-white border border-gray-200 px-6 py-8 shadow-sm">
                <h1 className="text-xl font-semibold text-gray-900">Join DistroKid</h1>
                <p className="text-sm text-gray-600">Create your account to get started</p>
                
                {error && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="w-full space-y-3">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="text-sm"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="text-sm"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-900"
                    >
                        <option value="Artist">Artist</option>
                        <option value="Manager">Manager</option>
                    </select>
                    <Input
                        type="text"
                        name="socialMediaLink"
                        placeholder="Social Media Link (optional)"
                        className="text-sm"
                        value={formData.socialMediaLink}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <textarea
                        name="bio"
                        placeholder="Bio (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-900 min-h-[80px]"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="text-sm"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="text-sm"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </Button>
                </form>
            </div>
            <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
                <p>Already have an account?</p>
                <Link href="/login" className="text-blue-600 hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );
}
