import User from "@models/userModel";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
// console.log({clientId:process.env.GOOGLE_ID,
//     clientSecret:process.env.GOOGLE_CLIENT_SECRET})

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks:{
        async session ({ session }){
            const sessionUser = await User.findOne({email:session.user.email})
            session.user.id = sessionUser._id.toString();
            return session;
            //to make sure which user is currently online 
        },
        async signIn({ profile}){
            try{
                await connectToDB();
                //checking if user already exits
                const userExists = await User.findOne({
                    email:profile.email
                });
                // if user does not exists then create one
    
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture,
                    })
                }
                return true;
    
            }catch(error){
                //console.log(error);
            }
        }
    },
    secret:process.env.NEXT_AUTH_SECRET,
})
export {handler as GET, handler as POST };