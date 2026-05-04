
import {
    signOut
} from "firebase/auth";
import {
    useNavigate
} from "react-router-dom";
import {
    auth
} from "../firebase";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export function useLogout(userName = "", roleLabel = "") {
    const nav = useNavigate();

    const logout = async () => {
        const result = await Swal.fire({
            title: `Log out, ${userName.split(" ")[0]}?`,
            text: `Are you sure you want to sign out of your ${roleLabel.toLowerCase()} account?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#E24B4A",
            cancelButtonColor: "#6b7280",
            customClass: {
                popup: "rounded-2xl text-sm"
            },
        });

        if (result.isConfirmed) {
            await signOut(auth);
            nav("/");
             toast.success("You have been successfully logged out.");
        }
    };

    return logout;
}