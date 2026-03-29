import { useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerAPI } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "Artist" | "Manager";
    bio: string;
    socialMediaLink: string;
}

export function useRegisterForm() {
    const router = useRouter();
    const authLogin = useAuthStore((state) => state.login);
    
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Artist",
        bio: "",
        socialMediaLink: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        try {
            const { token, user } = await registerAPI(
                formData.name,
                formData.email,
                formData.password,
                formData.confirmPassword,
                formData.role,
                formData.bio,
                formData.socialMediaLink
            );
            authLogin(token, user);
            router.push("/tracks");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        error,
        isLoading,
        handleSubmit,
    };
}
