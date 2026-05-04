import {
    useState,
    useEffect
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
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    toast
} from "react-toastify";
import {
    useAuthUser
} from "./useAuthUser";
import {
    uploadImage
} from "./useUploadImage";
import api from "../api";

// Schema
const profileSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z.string().min(8, "Invalid phone number"),

    age: z.coerce.number().min(18).optional(),
    weight: z.coerce.number().min(50).optional(),
    height: z.coerce.number().min(100).optional(),
    bloodType: z.string().optional(),
    gender: z.string().optional(),
    diseases: z.string().optional(),

    address: z.string().min(5, "Address is required"),
    image: z.any().optional(),
    licenseNumber: z.string().optional(),
});

export function useProfileUpdate() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        data: user,
        refreshUser,
        isLoading
    } = useAuthUser();

    const [location, setLocation] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
        },
    });

    // 🔥 FIX 1: حماية من null
    const userId = user ?.userId;
    const profileId = user ?.profileId;
    const role = user ?.role || "donor";

    useEffect(() => {
        if (!user) return;

        form.reset({
            ...user,
            age: user.age || "",
            weight: user.weight || "",
            height: user.height || "",
        });

        if (user.lat && user.lng) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocation({
                lat: user.lat,
                lng: user.lng
            });
        }

        if (user.image) {
            setImagePreview(user.image);
        }
    }, [user, form]);

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            if (!userId) throw new Error("User not loaded yet");

            let finalImageUrl = user ?.image;

            if (data.image && data.image[0] instanceof File) {
                finalImageUrl = await uploadImage(data.image[0]);
            }

            const userData = {
                name: data.name,
                phone: data.phone,
                image: finalImageUrl || "",
            };

            // 🔥 FIX 2: استخدام userId بأمان
            await api.put(`/users/${userId}`, userData);

            if (role === "donor") {
                await api.patch(`/donors/${profileId}`, {
                    age: data.age,
                    weight: data.weight,
                    height: data.height,
                    bloodType: data.bloodType,
                    gender: data.gender,
                    diseases: data.diseases,
                    address: data.address,
                    lat: location ?.lat,
                    lng: location ?.lng,
                });
            } else if (role === "hospital") {
                await api.patch(`/hospitals/user/${profileId}`, {
                    licenseNumber: data.licenseNumber,
                    address: data.address,
                    lat: location ?.lat,
                    lng: location ?.lng,
                });
            }
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["authUser"]
            });

            toast.success("Profile updated successfully ✨");

            await refreshUser();

            navigate(`/${role}/profile`);
        },

        onError: (err) => {
            toast.error(err ?.response ?.data ?.message || "Failed to update profile");
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    return {
        form,
        location,
        setLocation,
        imagePreview,
        handleImageChange,
        loading,
        setLoading,
        isLoading,
        isSubmitting: updateMutation.isPending,
        onSubmit: (data) => updateMutation.mutate(data),
        role,
    };
}