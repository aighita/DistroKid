"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Stepper, { Step } from "@/components/Stepper";
import GradientText from "@/components/GradientText";
import { div } from "three/src/nodes/tsl/TSLBase.js";

export default function Register() {
  return (
    <div className="flex flex-col w-full h-full gap-2 p-6 items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
            <GradientText
                colors={["#5227FF","#FF9FFC","#B19EEF"]}
                animationSpeed={25}
                showBorder={false}
                className="text-6xl font-bold"
            >
                DistroKid
            </GradientText>
            <p className="text-neutral-500">Join the music revolution</p>
        </div>
        
        <Stepper
            initialStep={1}
            backButtonText="Back"
            nextButtonText="Next"
            stepContainerClassName="w-full"
            contentClassName=""
            containerClassName="w-full"
            showBorder={false}
            >
            <Step>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Create Your Account</h2>
                    <p className="text-neutral-500 mb-6">Let's get started with your DistroKid profile</p>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Username</label>
                            <Input
                                type="text"
                                placeholder="Choose a username"
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                </div>
            </Step>
            
            <Step>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Secure Your Account</h2>
                    <p className="text-neutral-500 mb-6">Create a strong password</p>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Confirm Password</label>
                            <Input
                                type="password"
                                placeholder="Confirm password"
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                </div>
            </Step>
            
            <Step>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Artist Profile</h2>
                    <p className="text-neutral-500 mb-6">Tell us about your music</p>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-2">Artist Name</label>
                            <Input
                                type="text"
                                placeholder="Your artist name"
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Genre</label>
                            <Input
                                type="text"
                                placeholder="e.g., Electronic, Hip-Hop, Rock"
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                </div>
            </Step>
            
            <Step>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Confirm & Complete</h2>
                    <p className="text-neutral-500 mb-6">Review your information before completing registration</p>
                    <div className="bg-neutral-900 rounded p-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Email:</span>
                            <span>your@email.com</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Username:</span>
                            <span>username</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Artist Name:</span>
                            <span>Your Artist Name</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Genre:</span>
                            <span>Electronic</span>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-500">By clicking Complete, you agree to our Terms of Service</p>
                </div>
            </Step>
        </Stepper>

        <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
            <p>Already have an account?</p>
            <Button
                variant="link"
                onClick={() => window.location.href = "/login"}
                className="cursor-pointer"
            >
                Login
            </Button>
        </div>
    </div>
  );
}
