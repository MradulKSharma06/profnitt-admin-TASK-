import axios from "axios"
import { ProjectData } from "@/types"

const BASE_URL = "/api/project"

export const getProjects = async (): Promise<ProjectData[]> => {
    const res = await axios.get(BASE_URL)
    return res.data
}

export const getProject = async (id: string): Promise<ProjectData> => {
    const res = await axios.get(`${BASE_URL}/${id}`)
    return res.data
}

export const createProject = async (data: ProjectData): Promise<ProjectData> => {
    const res = await axios.post(BASE_URL, data)
    return res.data
}

export const updateProject = async (id: string, data: Partial<ProjectData>): Promise<ProjectData> => {
    const res = await axios.put(`${BASE_URL}/${id}`, data)
    return res.data
}

export const deleteProject = async (id: string): Promise<{ success: boolean }> => {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data
}
