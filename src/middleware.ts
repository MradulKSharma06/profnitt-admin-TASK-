import { NextResponse } from 'next/server'

export function middleware() {
    // You can add custom logic here, like protecting routes
    return NextResponse.next()
}

// (Optional) Apply middleware only to specific routes:
export const config = {
    matcher: ['/admin/:path*'], // Run only on /admin pages
}
