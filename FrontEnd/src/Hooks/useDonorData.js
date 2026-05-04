import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import api from "../api";

const canDonateTo = (donorBlood, requestBlood) => {
    if (!donorBlood || !requestBlood) return false;
    const compatibility = {
        "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
        "O+": ["O+", "A+", "B+", "AB+"],
        "A-": ["A-", "A+", "AB-", "AB+"],
        "A+": ["A+", "AB+"],
        "B-": ["B-", "B+", "AB-", "AB+"],
        "B+": ["B+", "AB+"],
        "AB-": ["AB-", "AB+"],
        "AB+": ["AB+"]
    };
    return compatibility[donorBlood]?.includes(requestBlood) || false;
};

const isNearby = (donor, hospital) => {
    if (!donor?.lat || !donor?.lng || !hospital?.lat || !hospital?.lng) {
        return true;
    }
    const dx = donor.lat - hospital.lat;
    const dy = donor.lng - hospital.lng;
    return Math.sqrt(dx * dx + dy * dy) <= 0.5;
};

export function useDonorData(donorId) {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ["users"],
        queryFn: async () => (await api.get(`/users`)).data,
    });
    const users = usersQuery.data || [];

    const hospitalsQuery = useQuery({
        queryKey: ["hospitals"],
        queryFn: async () => (await api.get(`/hospitals`)).data,
    });
    const hospitals = hospitalsQuery.data || [];

  const donorQuery = useQuery({
      queryKey: ["donor", donorId],
      enabled: !!donorId,
      queryFn: async () => {
          const res = await api.get(`/donors`);
          const foundDonor = res.data.find((d) => String(d.id) === String(donorId));
          return foundDonor || null;
      },
  });
    const donor = donorQuery.data;

    const bloodRequestsQuery = useQuery({
        queryKey: ["bloodRequests"],
        queryFn: async () => (await api.get(`/requests`)).data,
    });
    const allRequests = bloodRequestsQuery.data || [];

    const donationHistoryQuery = useQuery({
        queryKey: ["donationHistory", donorId],
        enabled: !!donorId,
        queryFn: async () => (await api.get(`/history?donorId=${donor?.id}`)).data,
    });

    const notificationsQuery = useQuery({
        queryKey: ["notifications", donorId],
        enabled: !!donorId,
        queryFn: async () => {
            const res = await api.get(`/notifications?userId=${donorId}`);
            return (res.data || []).sort((a, b) => new Date(b.time) - new Date(a.time));
        },
    });

    const getUserNameByUserId = (uId) => {
        const user = users.find(u => String(u.id) === String(uId));
        return user?.name || "Unknown Hospital";
    };

    const getHospitalNameByHospitalTableId = (hTableId) => {
        const hospitalEntry = hospitals.find(h => String(h.id) === String(hTableId));
        if (!hospitalEntry) return "Unknown Hospital";
        return getUserNameByUserId(hospitalEntry.userId);
    };

    const donationHistory = (donationHistoryQuery.data || []).map((item) => ({
        ...item,
        hospitalName: getHospitalNameByHospitalTableId(item.hospitalId),
        donorName: users.find(u => String(u.id) === String(donorId))?.name || "Donor",
    }));

    const onTheWayRequests = donationHistory.filter(item => String(item.status).toLowerCase() === "ontheway");
    const onTheWayIds = new Set(onTheWayRequests.map(r => r.requestId));
    const hasActiveTrip = onTheWayRequests.length > 0;

    const donationStatus = (() => {
        const lastDonationDate = donor?.lastDonation;
        if (!lastDonationDate) return { canDonate: true, daysLeft: 0, progress: 100 };
        // eslint-disable-next-line react-hooks/purity
        const diffDays = Math.floor((Date.now() - new Date(lastDonationDate).getTime()) / 86400000);
        return {
            canDonate: diffDays >= 90,
            daysLeft: Math.max(0, 90 - diffDays),
            progress: Math.min(100, (diffDays / 90) * 100),
        };
    })();


    const compatibleRequests = allRequests
        .filter(req => {
            const isCompatible = canDonateTo(donor?.bloodType, req.bloodTypeNeeded);
            const hospitalProfile = hospitals.find(h => String(h.id) === String(req.hospitalId));
            const nearby = isNearby(donor, hospitalProfile);
            const isActive = req.status === "Pending";
            return isCompatible && nearby && isActive && !onTheWayIds.has(req.id);
        })
        .map(req => ({
            ...req,
            hospitalName: getHospitalNameByHospitalTableId(req.hospitalId),
            hospitalAddress: hospitals.find(h => String(h.id) === String(req.hospitalId))?.address || "Address not available",
        }));

   
   
    const acceptRequestMutation = useMutation({
        mutationFn: async (requestId) => {
            if (!donor) throw new Error("Donor profile not loaded!");
          const donorUser = users.find(u => String(u.id) === String(donor.userId));
          const donorUserName = donorUser ?.name || "A donor";
            const req = allRequests.find(r => String(r.id) === String(requestId));
            const hospitalEntry = hospitals.find(h => String(h.id) === String(req.hospitalId));

            const payload = {
                donorId: Number(donor.id),
                hospitalId: Number(req.hospitalId),
                requestId: Number(requestId),
                bloodType: donor.bloodType,
                status: "OnTheWay",
                time: new Date().toISOString()
            };

            await api.post(`/history`, payload);

            if (hospitalEntry) {
                await api.post(`/notifications`, {
                    userId: Number(hospitalEntry.userId),
                    message: `Donor ${donorUserName} is on the way for type ${donor.bloodType}!`,
                    type: "INFO",
                    time: new Date().toISOString(),
                    status: "Unread"
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["bloodRequests"]);
            queryClient.invalidateQueries(["donationHistory", donorId]);
            queryClient.invalidateQueries(["notifications", donorId]);
        },
        onError: (err) => alert(err.message)
    });

 
    const cancelRequestMutation = useMutation({
        mutationFn: async (requestId) => {
            const historyRes = await api.get(`/history?donorId=${donor?.id}&requestId=${requestId}&status=OnTheWay`);
            const record = historyRes.data[0];

            if (record) {
                const hospitalEntry = hospitals.find(h => String(h.id) === String(record.hospitalId));
                 const donorUser = users.find(u => String(u.id) === String(donor.userId));
                 const donorUserName = donorUser ?.name || "A donor";
                await api.delete(`/history/${record.id}`);

                if (hospitalEntry) {
                    await api.post(`/notifications`, {
                        userId: Number(hospitalEntry.userId),
                        message: `Apologies, donor ${donorUserName} has cancelled their trip for blood type ${donor.bloodType}.`,
                        type: "WARNING",
                        time: new Date().toISOString(),
                        status: "Unread"
                    });
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["bloodRequests"]);
            queryClient.invalidateQueries(["donationHistory", donorId]);
            queryClient.invalidateQueries(["notifications", donorId]);
        },
    });


    const markAsReadMutation = useMutation({
        mutationFn: async (notificationId) => {
            await api.patch(`/notifications/${notificationId}`, { status: "Read" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications", donorId]);
        }
    });

   
    const deleteNotificationMutation = useMutation({
        mutationFn: async (notificationId) => {
            await api.delete(`/notifications/${notificationId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications", donorId]);
        }
    });
    const markAllAsReadMutation = useMutation({
        mutationFn: async () => {
            const unread = (notificationsQuery.data || []).filter(n => n.status === "Unread");
            const promises = unread.map(n => api.patch(`/notifications/${n.id}`, { status: "Read" }));
            await Promise.all(promises);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications", donorId]);
        }
    });

    return {
        donor,
        donationHistory,
        compatibleRequests,
        onTheWayRequests,
        onTheWayIds,
        hasActiveTrip,
        notifications: notificationsQuery.data || [],
        hospitals,
        stats: {
            donationsCount: donor?.donationsCount || 0,
            lastDonationDate: donor?.lastDonation,
            ...donationStatus,
            livesImpacted: (donor?.donationsCount || 0) * 3,
        },
        actions: {
            acceptRequest: acceptRequestMutation.mutate,
            cancelRequest: cancelRequestMutation.mutate,
            markAsRead: markAsReadMutation.mutate,
            deleteNotification: deleteNotificationMutation.mutate,
            markAllAsRead: markAllAsReadMutation.mutate,
            isAccepting: acceptRequestMutation.isPending,
            isCancelling: cancelRequestMutation.isPending,
            canRequestAction: donationStatus.canDonate && !hasActiveTrip,
        },
        loading: donorQuery.isLoading || hospitalsQuery.isLoading || usersQuery.isLoading || bloodRequestsQuery.isLoading || donationHistoryQuery.isLoading || notificationsQuery.isLoading,
    };
}