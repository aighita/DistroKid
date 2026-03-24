import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";

export function useLoginForm() {
    const router = useRouter();
    const authLogin = useAuthStore((state) => state.login);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { token, user } = await login(email, password);
            authLogin(token, user);
            router.push("/tracks");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        handleSubmit,
    };
}
