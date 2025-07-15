export async function uploadImageToCloudinary(file: File): Promise<string> {
    const cloudName = "dz31stmeh"
    const uploadPreset = "profnitt_uploads" 

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    })

    if (!res.ok) {
        const error = await res.json()
        console.error("Cloudinary Error:", error)
        throw new Error("Image upload failed")
    }

    const data = await res.json()
    return data.secure_url as string
}
