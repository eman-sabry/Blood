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
    signOut,
} from "firebase/auth";
import {
    toast
} from "react-toastify";
import {
    auth
} from "../firebase";
import {
    uploadImage
} from "./useUploadImage";
import api from "../api";

const donorSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
 phone: z.string().min(8, "Invalid phone number"),
    age: z.coerce.number().min(18, "You must be at least 18 years old"),
    weight: z.coerce.number().min(50, "Weight must be at least 50 kg"),
    height: z.coerce.number().min(1, "Please enter a valid height"),

    bloodType: z.string().min(1, "Please select your blood type"),
    gender: z.string().min(1, "Please select your gender"),

    lastDonation: z.string().optional().refine((date) => {
        if (!date) return true;

        const inputDate = new Date(date);
        const today = new Date();

        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return inputDate <= today;
    }, {
        message: "Donation date cannot be in the future",
    }),

    diseases: z.string().optional(),

    lat: z.number({
        invalid_type_error: "Invalid latitude value"
    }).optional(),
    lng: z.number({
        invalid_type_error: "Invalid longitude value"
    }).optional(),

    address: z.string().optional(),

    image: z.any().refine((file) => file ? file.length > 0 : false, {
        message: "Please upload a profile image",
    }),

    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
});

export function useRegisterDonor() {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const nav = useNavigate();

    const form = useForm({
        resolver: zodResolver(donorSchema),
        defaultValues: {
            terms: false,
        },
    });

  const onSubmit = async (data) => {
  try {
    setLoading(true);

    const imageUrl = await uploadImage(data.image[0]);

    await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const userPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      role: "donor",
      status: "approved",
      image: imageUrl,
    };

    const donorPayload = {
      age: data.age,
      weight: data.weight,
      height: data.height,
      bloodType: data.bloodType,
      gender: data.gender,
      lastDonation: data.lastDonation || null,
      diseases: data.diseases || "",
      address: data.address || "",
      lat: location?.lat || null,
      lng: location?.lng || null,
      donationsCount: 0,
      image: imageUrl,
    };

    await api.post("/auth/register-donor", {
      user: userPayload,
      donor: donorPayload,
    });

    await signOut(auth);

    toast.success("Account created 🎉");
    nav("/login");

  } catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

    return {
        form,
        loading,
        onSubmit,
        location,
        setLocation,
    };
}