import axios from "axios"
import { GalleryImage } from "@/types"

const BASE_URL = "/api/gallery"

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
    const res = await axios.get(BASE_URL)
    return res.data
}

export const getImage = async (id: string): Promise<GalleryImage> => {
    const res = await axios.get(`${BASE_URL}/${id}`)
    return res.data
}

export const addImage = async (data: GalleryImage): Promise<GalleryImage> => {
    const res = await axios.post(BASE_URL, data)
    return res.data
}

export const updateImage = async (id: string, data: Partial<GalleryImage>): Promise<GalleryImage> => {
    const res = await axios.put(`${BASE_URL}/${id}`, data)
    return res.data
}

export const deleteImage = async (id: string): Promise<{ success: boolean }> => {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data
}
