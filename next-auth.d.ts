
declare module "next-auth" {
    interface Session {
        user:{
            id:string;
        } & DefaultSession["user"];
    }
}

export {} // This is required to make this file a module