
// -------------------- Event --------------------
export interface EventData {
    _id?: string
    title: string
    description: string
    date: string               
    venue: string
    tags: string[]
    imageUrl?: string
    createdBy?: string
    createdAt?: string
    updatedAt?: string
    views?: number
    edits?: number
    deletions?: number
    eventType: string
}

// -------------------- Project --------------------
export interface ProjectData {
    _id?: string
    title: string
    description: string
    technologies: string[]
    status: "ongoing" | "completed"
    githubUrl?: string
    demoUrl?: string
    createdBy?: string
    createdAt?: string
    updatedAt?: string
    views?: number
    edits?: number
    deletions?: number
}

// -------------------- Member --------------------
export interface MemberData {
    _id?: string
    name: string
    role: string
    type: "Core" | "Manager" | "Coordinator"
    photoUrl?: string
    bio: string
    linkedinUrl?: string
    addedBy?: string
    createdAt?: string
    updatedAt?: string
    edits?: number
    deletions?: number
}

// -------------------- Gallery --------------------
export interface GalleryImage {
    _id?: string
    imageUrls: string[]             
    tags?: string[]
    caption?: string
    uploadedBy?: string
    uploadedAt?: string
    updatedAt?: string
    views?: number
    edits?: number
    deletions?: number
    title:string
}

// -------------------- Action Log --------------------
export interface ActionLogEntry {
    _id?: string
    action: "create" | "update" | "delete" | "view"
    targetType: "event" | "project" | "member" | "gallery"
    targetId: string
    performedBy: string
    timestamp?: string
}
