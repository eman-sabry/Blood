
import {
    useState
} from "react";
import {
    useNavigate
} from "react-router-dom";
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
    auth
} from "../firebase";
import 
    api
 from "../api";

const hospitalSchema = z.object({
    hospitalName: z.string().min(3, "Hospital name is too short"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().min(8, "Invalid phone number"),
    licenseNumber: z.string().min(3, "License required"),
     lat: z.number({
             required_error: "Location is required. Please click 'Detect My Location'",
             invalid_type_error: "Location is required. Please click 'Detect My Location'"
         }),
         lng: z.number({
             required_error: "Location is required",
             invalid_type_error: "Location is required"
         }),

         address: z.string().min(5, "Please detect your location"),

    terms: z.boolean().refine((val) => val === true, {
        message: "You must agree to continue",
    }),
});

export function useRegisterHospital() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const form = useForm({
        resolver: zodResolver(hospitalSchema),
        defaultValues: {
            terms: false,
        },
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
             name: data.hospitalName,
             email: data.email,
             phone: data.phone || "",
             role: "hospital",
             status: "pending",
         };

         const hospitalPayload = {
             licenseNumber: data.licenseNumber,
             address: data.address || "",
             lat: location ?.lat || null,
             lng: location ?.lng || null,
         };

         await api.post("/auth/register-hospital", {
             user: userPayload,
             hospital: hospitalPayload,
         });

         await signOut(auth);

         toast.success("Request sent");
         nav("/login");

     } catch (err) {
         toast.error(err.message);
     } finally {
         setLoading(false);
     }
 };

    return {
        form,
        location,
        setLocation,
        loading,
        onSubmit,
    };
}