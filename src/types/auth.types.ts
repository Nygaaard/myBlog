export interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    createdAt: string
}

export interface loginCredentials {
    username: string,
    password: string
}

export interface AuthResponse {
    user: User,
    token: string
}

export interface AuthContextType {
    user: User | null,
    login: (credentials: loginCredentials) => Promise<void>;
    logout: () => void;
}