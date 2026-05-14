import {
  useEffect,
  useState
} from "react";
import {
  onAuthStateChanged
} from "firebase/auth";
import {
  auth
} from "../firebase";
import api from "../api";

export function useAuthUser() {
  const [state, setState] = useState({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setState({
          user: null,
          loading: false
        });
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const {
          data
        } = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

 
        const userBase = data ?.user || data;
        const userProfile = userBase ?.profile || {};

        setState({
          user: {
            ...userBase,
            ...userProfile, 
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            userId: userBase.id,
              profileId: userProfile.id,
            role: userBase ?.role,
          },
          loading: false,
        });
      } catch (err) {
        console.error("AUTH ERROR:", err);
        setState({
          user: null,
          loading: false
        });
      }
    });

    return () => unsub();
  }, []);

  return {
    data: state.user,
    isLoading: state.loading,
    authLoading: state.loading,
  };
}