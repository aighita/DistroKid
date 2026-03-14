export type LoginPayload  = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
};

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

// export type RegisterResponse = {
//     response: {
//         message: string;
//     };
//     errorMessage: number;
// }

export type AuthError = {
    message: string;
    code: string;
};
