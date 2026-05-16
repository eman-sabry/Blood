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
    const usersQuery = useQuery({
        queryKey: ["admin", "users"],
        queryFn: async () => (await api.get("/users")).data,
        initialData: []
    });

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

    const historyQuery = useQuery({
        queryKey: ["admin", "history"],
        queryFn: async () => (await api.get("/history")).data,
        initialData: []
    });
    const getUserById = (userId) => usersQuery.data.find(u => String(u.id) === String(userId)) || {};

   
    const enrichedHospitals = useMemo(() => {
        return hospitalsQuery.data.map(h => {
            const user = getUserById(h.userId);
            return {
                ...h,
                displayName: user.name || "Unknown Hospital",
                email: user.email,
                phone: user.phone,
                status: user.status || "pending"
            };
        }).filter(h => h.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [hospitalsQuery.data, usersQuery.data, searchTerm]);


    const enrichedDonors = useMemo(() => {
        return donorsQuery.data.map(d => {
            const user = getUserById(d.userId);
            return {
                ...d,
                displayName: user.name || "Unknown Donor",
                status: user.status || "active",
                phone: user.phone,
                 email: user.email,

            };
        }).filter(d => d.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [donorsQuery.data, usersQuery.data, searchTerm]);

    const enrichedHistory = useMemo(() => {
        return historyQuery.data.map(item => {
            const hospital = hospitalsQuery.data.find(h => String(h.id) === String(item.hospitalId));
            const donorProfile = donorsQuery.data.find(d => String(d.id) === String(item.donorId));

            const hUser = hospital ? getUserById(hospital.userId) : {};
            const dUser = donorProfile ? getUserById(donorProfile.userId) : {};

            return {
                ...item,
                hospitalName: hUser.name || "Deleted Hospital",
                donorName: dUser.name || "Unknown Donor",
                bloodType: item.bloodType || donorProfile ?.bloodType || "N/A"
            };
        }).filter(item =>
            item.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.donorName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [historyQuery.data, hospitalsQuery.data, donorsQuery.data, usersQuery.data, searchTerm]);

   
    const enrichedRequests = useMemo(() => {
        return requestsQuery.data.map(req => {
            const hospital = hospitalsQuery.data.find(h => String(h.id) === String(req.hospitalId));
            const hUser = hospital ? getUserById(hospital.userId) : {};
            return {
                ...req,
                hospitalName: hUser.name || "Hospital Not Found",
                hospitalAddress: hospital ?.address || "Address N/A",
                hospitalPhone: hospital ?.phone || "N/A"
            };
        }).filter(req => req.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [requestsQuery.data, hospitalsQuery.data, usersQuery.data, searchTerm]);

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
            toast.success("Hospital account activated! 🎉");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async ({
            userId
        }) => await api.delete(`/users/${userId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin"]);
           
        }
    });

    return {
        donors: enrichedDonors,
        hospitals: enrichedHospitals,
        requests: enrichedRequests,
        history: enrichedHistory,
        search: {
            term: searchTerm,
            setTerm: setSearchTerm
        },
        isLoading: usersQuery.isLoading || hospitalsQuery.isLoading || donorsQuery.isLoading || requestsQuery.isLoading || historyQuery.isLoading,
        actions: {
            approve: (id) => approveMutation.mutate(id),
            deleteHospital: (hospitalId) => {
                const target = hospitalsQuery.data.find(h => h.id === hospitalId);
                if (target ?.userId) deleteMutation.mutate({
                    userId: target.userId
                });
            },
            deleteDonor: (donorId) => {
                const target = donorsQuery.data.find(d => d.id === donorId);
                if (target ?.userId) deleteMutation.mutate({
                    userId: target.userId
                });
            }
        }
    };
}