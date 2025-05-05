import ImageKit from "imagekit";
import { NextResponse } from "next/server";    


const imagekit = new ImageKit({
    publicKey:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});


export async function GET() {
    try {
        
        // it will return {token, signature, expire}

        const authenticationParameters = await imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters, { status: 200 });
    } catch (error) {
        console.error("Error generating ImageKit authentication parameters:", error);
        return NextResponse.json({ error: "Failed to generate Imagekit authentication parameters" }, { status: 500 });
        
    }
return NextResponse.json(imagekit.getAuthenticationParameters());
}
