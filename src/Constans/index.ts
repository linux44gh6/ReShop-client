export const sendImagesToCloudinary = async (files: File[]): Promise<string[]> => {
    try {
        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file); // ✅ Send actual file, not file.name
            formData.append("upload_preset", "ReShop"); // ✅ Use correct preset name

            const response = await fetch(`https://api.cloudinary.com/v1_1/da1t0c7he/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Cloudinary Response:", data); // ✅ Debugging response

            if (!response.ok) {
                throw new Error(data.error?.message || "Image upload failed");
            }

            return data.secure_url; // ✅ Return uploaded image URL
        });

        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload images");
    }
};
