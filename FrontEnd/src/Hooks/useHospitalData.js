import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import api from "../api";
import {
    toast
} from "react-toastify";

export function useHospitalData(hospitalId) {
    const queryClient = useQueryClient();

    const sendNotification = async (targetUid, message, type) => {
        try {
            await api.post(`/notifications`, {
                userId: targetUid,
                message,
                type,
                time: new Date().toISOString(),
                status: "Unread"
            });
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
    };
//expired in 42 day of create
    const getCalculatedExpiryDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 42);
        return date.toISOString();
    };

    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: async () => (await api.get(`/users`)).data,
    });

    const donorsQuery = useQuery({
        queryKey: ["donors"],
        queryFn: async () => (await api.get(`/donors`)).data,
    });

    const activeRequestsQuery = useQuery({
        queryKey: ["activeRequests", hospitalId],
        enabled: !!hospitalId,
        queryFn: async () => {
            const res = await api.get(`/requests?hospitalId=${hospitalId}`);
            return res.data.filter((r) => !["Completed", "Inactive"].includes(r.status));
        },
    });

    const allRequestsQuery = useQuery({
        queryKey: ["allRequests", hospitalId],
        enabled: !!hospitalId,
        queryFn: async () => (await api.get(`/requests?hospitalId=${hospitalId}`)).data,
    });

    const bloodStockQuery = useQuery({
        queryKey: ["bloodStock", hospitalId],
        enabled: !!hospitalId,
        queryFn: async () => {
            const res = await api.get(`/stock`);
            const today = new Date();
            const validStock = res.data.filter((item) => {
                const matchesHospital = String(item.hospitalId) === String(hospitalId);
                const isNotExpired = !item.expiryDate || new Date(item.expiryDate) >= today;
                return matchesHospital && isNotExpired;
            });

            const aggregated = validStock.reduce((acc, item) => {
                const type = item.bloodType;
                if (!acc[type]) {
                    acc[type] = {
                        bloodType: type,
                        quantity: 0,
                        id: item.id
                    };
                }
                acc[type].quantity += Number(item.quantity);
                return acc;
            }, {});
            return Object.values(aggregated);
        },
    });

    const expiringStockQuery = useQuery({
        queryKey: ["expiringStock", hospitalId],
        enabled: !!hospitalId,
        queryFn: async () => {
            const res = await api.get(`/stock`);
            const today = new Date();
            const threeDaysFromNow = new Date();
            threeDaysFromNow.setDate(today.getDate() + 3);

            return res.data.filter((item) => {
                const matchesHospital = String(item.hospitalId) === String(hospitalId);
                if (!matchesHospital || !item.expiryDate) return false;
                const expiry = new Date(item.expiryDate);
                return expiry <= threeDaysFromNow && expiry >= today;
            });
        },
    });

    const donationHistoryQuery = useQuery({
        queryKey: ["donationHistory", hospitalId],
        enabled: !!hospitalId,
        queryFn: async () => (await api.get(`/history?hospitalId=${hospitalId}`)).data,
    });

    const notificationsQuery = useQuery({
        queryKey: ["notifications", hospitalId],
        enabled: !!hospitalId,
        queryFn: async () => {
            const res = await api.get(`/notifications?userId=${hospitalId}`);
            return (res.data || []).sort((a, b) => new Date(b.time) - new Date(a.time));
        },
    });

    const users = usersQuery.data || [];
    const donors = donorsQuery.data || [];

  const hospitalsQuery = useQuery({
      queryKey: ["hospitals"],
      queryFn: async () => (await api.get(`/hospitals`)).data, 
  });

  const hospitals = hospitalsQuery.data || [];

  
  const donationHistoryWithNames = (donationHistoryQuery.data || []).map((item) => {
    
      const donorProfile = donors.find(d => String(d.id) === String(item.donorId));
      const donorUser = donorProfile ? users.find(u => String(u.id) === String(donorProfile.userId)) : null;

      const hospitalProfile = hospitals.find(h => String(h.id) === String(item.hospitalId));
      
      const hospitalUser = hospitalProfile ? users.find(u => String(u.id) === String(hospitalProfile.userId)) : null;

      return {
          ...item,
          donorName: donorUser ?.name || "Unknown Donor",
          donorBloodType: donorProfile ?.bloodType || item.bloodType || "Unknown",
          hospitalName: hospitalUser ?.name || "Hospital"
      };
  });



    const createBloodRequest = async (data) => {
        try {
            const hId = parseInt(hospitalId);
            const qty = parseInt(data.quantity);
            if (!hId || isNaN(hId)) return toast.error("Invalid Hospital ID");
            if (!data.bloodTypeNeeded) return toast.error("Please select blood type");
            if (!qty || qty <= 0) return toast.error("Quantity must be greater than 0");

            const newRequest = {
                hospitalId: hId,
                bloodTypeNeeded: data.bloodTypeNeeded,
                quantity: qty,
                status: "Pending"
            };
            await api.post(`/requests`, newRequest);

            queryClient.invalidateQueries({
                queryKey: ["activeRequests", hospitalId]
            });
            queryClient.invalidateQueries({
                queryKey: ["allRequests", hospitalId]
            });
            toast.success("Request Created successfully!");
        } catch (error) {
            const errorMessage = error.response ?.data ?.error || error.message;
            toast.error(`Failed: ${errorMessage}`);
        }
    };

    const deleteRequest = async (requestId) => {
        try {
            await api.delete(`/requests/${requestId}`);
            queryClient.invalidateQueries({
                queryKey: ["activeRequests", hospitalId]
            });
            queryClient.invalidateQueries({
                queryKey: ["allRequests", hospitalId]
            });
            toast.success("Request deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    const completeDonorMutation = useMutation({
        mutationFn: async ({
            request,
            donorEntry,
            statusAction
        }) => {
            await api.patch(`/history/${donorEntry.id}`, {
                status: statusAction,
                reason: statusAction === "Cancelled" ? "Cancelled by Hospital" : "Successfully Donated"
            });

            const donorRecord = donors.find(d => String(d.id) === String(donorEntry.donorId));

            if (statusAction === "Completed") {
                const newQty = Math.max(0, (request.quantity || 1) - 1);
                await api.patch(`/requests/${request.id}`, {
                    status: newQty === 0 ? "Completed" : "Pending",
                    quantity: newQty
                });

                await api.post(`/stock`, {
                    hospitalId: Number(hospitalId),
                    bloodType: donorEntry.donorBloodType || request.bloodTypeNeeded,
                    quantity: 1,
                    expiryDate: getCalculatedExpiryDate(),
                    receivedDate: new Date().toISOString()
                });

                if (donorRecord) {
                    await api.patch(`/donors/${donorRecord.id}`, {
                        lastDonation: new Date().toISOString(),
                        donationsCount: (donorRecord.donationsCount || 0) + 1
                    });
                  
                    await sendNotification(donorRecord.userId, "Thank you! Your donation was successful.", "SUCCESS");
                }
            } else {
                if (donorRecord) {
                    await sendNotification(donorRecord.userId, "Your donation session was cancelled by the hospital.", "WARNING");
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["donationHistory"]
            });
            queryClient.invalidateQueries({
                queryKey: ["activeRequests"]
            });
            queryClient.invalidateQueries({
                queryKey: ["bloodStock"]
            });
            queryClient.invalidateQueries({
                queryKey: ["donors"]
            });
            toast.success("Action processed successfully");
        },
        onError: () => toast.error("Operation failed")
    });


    const markNotificationAsRead = useMutation({
        mutationFn: async (id) => await api.patch(`/notifications/${id}`, {
            status: "Read"
        }),
        onSuccess: () => queryClient.invalidateQueries(["notifications", hospitalId]),
    });

    const deleteNotification = useMutation({
        mutationFn: async (id) => await api.delete(`/notifications/${id}`),
        onSuccess: () => queryClient.invalidateQueries(["notifications", hospitalId]),
    });

    const markAllAsRead = useMutation({
        mutationFn: async () => {
            const unread = (notificationsQuery.data || []).filter(n => n.status === "Unread");
            await Promise.all(unread.map(n => api.patch(`/notifications/${n.id}`, {
                status: "Read"
            })));
        },
        onSuccess: () => queryClient.invalidateQueries(["notifications", hospitalId]),
    });

    const updateStock = async (hId, bloodType, units, operation = "add") => {
        const value = Number(units);
        if (!bloodType) return toast.error("Please select a blood type!");
        if (isNaN(value) || value <= 0) return toast.error("Enter a valid number.");

        try {
            if (operation === "add") {
                await api.post(`/stock`, {
                    hospitalId: Number(hId),
                    bloodType,
                    quantity: value,
                    expiryDate: getCalculatedExpiryDate(),
                    receivedDate: new Date().toISOString()
                });
                toast.success(`Added ${value} units of ${bloodType}`);
            } else {
                const res = await api.get(`/stock`);
                const hospitalStock = res.data
                    .filter(s => String(s.hospitalId) === String(hId) && s.bloodType === bloodType)
                    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

                const totalAvailable = hospitalStock.reduce((sum, item) => sum + Number(item.quantity), 0);
                if (value > totalAvailable) return toast.error(`Not enough stock!`);

                let remainingToRemove = value;
                for (const batch of hospitalStock) {
                    if (remainingToRemove <= 0) break;
                    const batchQty = Number(batch.quantity);
                    if (batchQty <= remainingToRemove) {
                        remainingToRemove -= batchQty;
                        await api.delete(`/stock/${batch.id}`);
                    } else {
                        await api.patch(`/stock/${batch.id}`, {
                            quantity: batchQty - remainingToRemove
                        });
                        remainingToRemove = 0;
                    }
                }
                toast.success(`Removed ${value} units.`);
            }
            queryClient.invalidateQueries({
                queryKey: ["bloodStock", hId]
            });
            queryClient.invalidateQueries({
                queryKey: ["expiringStock", hId]
            });
        } catch  {
            toast.error("Process failed.");
        }
    };

    return {
        activeRequests: activeRequestsQuery.data || [],
        allRequests: allRequestsQuery.data || [],
        bloodStock: bloodStockQuery.data || [],
        expiringStock: expiringStockQuery.data || [],
        availableDonors: donors,
        donationHistory: donationHistoryWithNames,
        notifications: notificationsQuery.data || [],
        onTheWayDonors: donationHistoryWithNames.filter(d => d.status === "OnTheWay"),
        completedDonations: donationHistoryWithNames.filter(d => d.status === "Completed"),
        cancelledDonations: donationHistoryWithNames.filter(d => d.status === "Cancelled"),
        loading: activeRequestsQuery.isLoading || bloodStockQuery.isLoading || donorsQuery.isLoading || usersQuery.isLoading || notificationsQuery.isLoading,
        createBloodRequest,
        deleteRequest,
        updateStock,
        completeDonor: completeDonorMutation.mutate,
        isCompletingDonor: completeDonorMutation.isPending,
        markAsRead: markNotificationAsRead.mutate,
        markAllAsRead: markAllAsRead.mutate,
        deleteNotification: deleteNotification.mutate,
        searchDonors: (q) => donors.filter(d => d.name ?.toLowerCase().includes(q.toLowerCase())),
    };
}