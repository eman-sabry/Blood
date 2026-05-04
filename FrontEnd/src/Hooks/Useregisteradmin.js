
import {
    useForm
} from "react-hook-form";
import {
    zodResolver
} from "@hookform/resolvers/zod";
import {
    z
} from "zod";
import {
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    toast
} from "react-toastify";
import {
    auth,
    
} from "../firebase";
import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"

const adminSchema = z.object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(8, "Invalid phone number"),
    secretCode: z.string().min(4, "Invalid admin code"),
});

export function useRegisterAdmin() {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(adminSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            const userPayload = {
                name: data.name,
                email: data.email,
                phone: data.phone || "",
                role: "admin",
                status: "approved",
            };

            const adminPayload = {
                secretCode: data.secretCode,
            };

            await api.post("/auth/register-admin", {
                user: userPayload,
                admin: adminPayload,
            });

            await signOut(auth);

            toast.success("Admin created");
            nav("/login");

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        onSubmit,
        loading
    };
}