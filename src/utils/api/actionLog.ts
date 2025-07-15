import axios from "axios"
import { ActionLogEntry } from "@/types"

const BASE_URL = "/api/action-log"

export const getActionLogs = async (): Promise<ActionLogEntry[]> => {
    const res = await axios.get(BASE_URL)
    return res.data
}

export const logAction = async (data: Omit<ActionLogEntry, "_id" | "timestamp">): Promise<ActionLogEntry> => {
    const res = await axios.post(BASE_URL, data)
    return res.data
}
