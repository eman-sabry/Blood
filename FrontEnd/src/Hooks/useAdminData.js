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

    // جلب كل المتبرعين
    const donorsQuery = useQuery({
        queryKey: ["admin", "donors"],
        queryFn: async () => (await api.get("/donors")).data,
    });

    // جلب كل المستشفيات
    const hospitalsQuery = useQuery({
        queryKey: ["admin", "hospitals"],
        queryFn: async () => (await api.get("/hospitals")).data,
    });

    // جلب طلبات الدم النشطة فقط
    const requestsQuery = useQuery({
        queryKey: ["admin", "requests"],
        queryFn: async () => {
            const res = await api.get("/requests");
            // تصفية الطلبات المكتملة أو الملغية لعرض النشط فقط في "Live Requests"
            return res.data.filter((r) => !["Completed", "Rejected"].includes(r.status));
        },
    });

    // جلب سجل العمليات
    const historyQuery = useQuery({
        queryKey: ["admin", "history"],
        queryFn: async () => (await api.get("/history")).data,
    });

    // منطق التحديث (Update/Approve)
    const upsertHospital = useMutation({
        mutationFn: async (hospital) => {
            return await api.put(`/hospitals/${hospital.id}`, hospital);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["admin", "hospitals"]);
            toast.success("Hospital status updated!");
        },
    });

    // منطق الحذف العام
    const deleteItem = useMutation({
        mutationFn: async ({
            collection,
            id
        }) => {
            await api.delete(`/${collection}/${id}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(["admin", variables.collection]);
            toast.success("Deleted successfully!");
        },
        onError: () => toast.error("Failed to delete."),
    });

    // فلترة المتبرعين بناءً على البحث
    const filteredDonors = useMemo(() => {
        let data = donorsQuery.data || [];
        if (searchTerm) {
            data = data.filter(d =>
                d.name ?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.bloodType ?.includes(searchTerm.toUpperCase())
            );
        }
        return data;
    }, [donorsQuery.data, searchTerm]);

    // فلترة المستشفيات بناءً على البحث
    const filteredHospitals = useMemo(() => {
        let data = hospitalsQuery.data || [];
        if (searchTerm) {
            data = data.filter(h =>
                h.hospitalName ?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return data;
    }, [hospitalsQuery.data, searchTerm]);

    return {
        donors: filteredDonors,
        hospitals: filteredHospitals,
        requests: requestsQuery.data || [],
        history: historyQuery.data || [],
        search: {
            term: searchTerm,
            setTerm: setSearchTerm
        },
        isLoading: donorsQuery.isLoading || hospitalsQuery.isLoading || requestsQuery.isLoading,
        actions: {
            approveHospital: (hospital) => {
                upsertHospital.mutate({
                    ...hospital,
                    isApproved: true,
                    status: "approved"
                });
            },
            deleteHospital: (id) => deleteItem.mutate({
                collection: "hospitals",
                id
            }),
            deleteRequest: (id) => deleteItem.mutate({
                collection: "requests",
                id
            }),
        }
    };
}