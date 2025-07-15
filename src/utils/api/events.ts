import axios from "axios"
import { EventData } from "@/types"

const BASE_URL = "/api/events"

export const getEvents = async (): Promise<EventData[]> => {
    const res = await axios.get(BASE_URL)
    return res.data
}

export const getEvent = async (id: string): Promise<EventData> => {
    const res = await axios.get(`${BASE_URL}/${id}`)
    return res.data
}

export const createEvent = async (data: EventData): Promise<EventData> => {
    const res = await axios.post(BASE_URL, data)
    return res.data
}

export const updateEvent = async (id: string, data: Partial<EventData>): Promise<EventData> => {
    const res = await axios.put(`${BASE_URL}/${id}`, data)
    return res.data
}

export const deleteEvent = async (id: string): Promise<{ success: boolean }> => {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data
}
