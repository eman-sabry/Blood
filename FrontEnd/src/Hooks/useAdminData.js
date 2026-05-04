import {
    useState,
    useMemo
} from "react";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import api from "../api";
import {
    toast
} from "react-toastify";

export function useAdminData() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");

    // 1. جلب بيانات المستخدمين الأساسية
    const {
        data: users = []
    } = useQuery({
        queryKey: ["admin", "users"],
        queryFn: async () => (await api.get("/users")).data,
    });

    // 2. جلب الجداول الفرعية
    const hospitalsQuery = useQuery({
        queryKey: ["admin", "hospitals"],
        queryFn: async () => (await api.get("/hospitals")).data,
        initialData: []
    });

    const donorsQuery = useQuery({
        queryKey: ["admin", "donors"],
        queryFn: async () => (await api.get("/donors")).data,
        initialData: []
    });

    const requestsQuery = useQuery({
        queryKey: ["admin", "requests"],
        queryFn: async () => (await api.get("/requests")).data,
        initialData: []
    });

    const getUserById = (userId) => users.find(u => String(u.id) === String(userId)) || {};

    // تفعيل الحساب
    const approveMutation = useMutation({
        mutationFn: async (hospitalId) => {
            const hospital = hospitalsQuery.data.find(h => h.id === hospitalId);
            if (!hospital ?.userId) throw new Error("User ID not found");
            return await api.patch(`/users/${hospital.userId}`, {
                status: "approved"
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["admin"]);
            toast.success("Hospital account activated successfully! 🎉");
        },
        onError: () => toast.error("Update failed.")
    });

    // حذف الحساب بالكامل (User + Profile)
    const deleteMutation = useMutation({
        mutationFn: async ({
            userId
        }) => {
            return await api.delete(`/users/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["admin"]);
            toast.success("User and all associated data deleted successfully");
        },
        onError: () => toast.error("Delete failed. Ensure server supports cascade delete.")
    });

    const enrichedHospitals = useMemo(() => {
        return (hospitalsQuery.data || []).map(h => {
            const user = getUserById(h.userId);
            return {
                ...h,
                displayName: user.name || "Unknown Hospital",
                status: user.status || "pending"
            };
        }).filter(h => h.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [hospitalsQuery.data, users, searchTerm]);

    const enrichedDonors = useMemo(() => {
        return (donorsQuery.data || []).map(d => {
            const user = getUserById(d.userId);
            return {
                ...d,
                displayName: user.name || "Unknown Donor",
                status: user.status || "active"
            };
        }).filter(d => d.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [donorsQuery.data, users, searchTerm]);

    const enrichedRequests = useMemo(() => {
        return (requestsQuery.data || []).map(req => {
            const hospital = hospitalsQuery.data.find(h => h.id === req.hospitalId);
            const hUser = hospital ? getUserById(hospital.userId) : {};
            return {
                ...req,
                hospitalName: hUser.name || "Deleted Hospital",
            };
        });
    }, [requestsQuery.data, hospitalsQuery.data, users]);

    return {
        donors: enrichedDonors,
        hospitals: enrichedHospitals,
        requests: enrichedRequests,
        search: {
            term: searchTerm,
            setTerm: setSearchTerm
        }, 
        searchTerm, 
        setSearchTerm,
        isLoading: hospitalsQuery.isLoading || donorsQuery.isLoading || requestsQuery.isLoading,
        actions: {
            approve: (id) => approveMutation.mutate(id),
            deleteH: (hospitalId) => {
                const target = hospitalsQuery.data.find(h => h.id === hospitalId);
                if (target ?.userId) deleteMutation.mutate({
                    userId: target.userId
                });
            },
            deleteD: (donorId) => {
                const target = donorsQuery.data.find(d => d.id === donorId);
                if (target ?.userId) deleteMutation.mutate({
                    userId: target.userId
                });
            }
        }
    };
}