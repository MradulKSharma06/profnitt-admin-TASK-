export async function uploadImageToCloudinary(file: File): Promise<string> {
    const cloudName = "YOUR_CLOUD_NAME"
    const uploadPreset = "YOUR_UNSIGNED_UPLOAD_PRESET"

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    })

    if (!res.ok) throw new Error("Image upload failed")

    const data = await res.json()
    return data.secure_url as string
}
