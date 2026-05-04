export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blood_donation");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfo85ox6y/image/upload", {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error("Image upload failed: " + (data.error?.message ?? "Unknown error"));
    }

    return data.secure_url;
}
