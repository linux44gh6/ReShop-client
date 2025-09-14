/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { getUser } from "@/Service/auth";
import { IUser } from "@/Types/loginData";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
interface  IUserProviderValues{
    avatar: string;
    name: string | undefined;
    user:IUser|null
    isLoading:boolean
    setUser:(user:IUser|null)=>void
    setIsLoading:Dispatch<SetStateAction<boolean>>
}

const UserContext=createContext<IUserProviderValues|null>(null)
const ContextProvider = ({children}:{children: React.ReactNode}) => {
    const [user,setUser]=useState<IUser|null>(null)
    const [isLoading,setIsLoading]=useState<boolean>(true)
    const handleUser=async()=>{
        const currentUser=await getUser()
        setUser(currentUser)
        setIsLoading(false)
    }
    useEffect(()=>{
        handleUser()
    },[isLoading])
    return (
        <UserContext.Provider value={{name: user?.name, avatar: user?.profileImg || "", user, isLoading, setUser, setIsLoading}} >
            {children}
        </UserContext.Provider>
    );
};

export const useUser=()=>{
    const context= useContext(UserContext)
    // console.log(context);
    if(!context){
        throw new Error("useUser must be used within a UserProvider")
    }   
    return context
}
export default ContextProvider;