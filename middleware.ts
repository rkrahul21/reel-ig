import withAuth from "next-auth/middleware";

import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl

                // Allow the requests if the following is true
                if (pathname.startsWith("/api/auth")
                    || pathname === "/login"
                    || pathname === "/register") { return true }

                //public routes
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true
                }


                // If the user is not logged in, redirect them to login page
                return !!token
            }
        }
    }
)

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ]
}