export const getAddressFromCoords = async (lat, lng) => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await res.json();

        return data ?.display_name || "";
    } catch (err) {
        console.error(err);
        return "";
    }
};