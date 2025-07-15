import axios from "axios"
import { MemberData } from "@/types"

const BASE_URL = "/api/members"

export const getMembers = async (): Promise<MemberData[]> => {
    const res = await axios.get(BASE_URL)
    return res.data
}

export const getMember = async (id: string): Promise<MemberData> => {
    const res = await axios.get(`${BASE_URL}/${id}`)
    return res.data
}

export const createMember = async (data: MemberData): Promise<MemberData> => {
    const res = await axios.post(BASE_URL, data)
    return res.data
}

export const updateMember = async (id: string, data: Partial<MemberData>): Promise<MemberData> => {
    const res = await axios.put(`${BASE_URL}/${id}`, data)
    return res.data
}

export const deleteMember = async (id: string): Promise<{ success: boolean }> => {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data
}
