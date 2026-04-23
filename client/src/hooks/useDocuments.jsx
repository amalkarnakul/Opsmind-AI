import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { useAuth } from '../context/AuthContext';

export default function useDocuments(){
    const [docs, setDocs]=useState([]);
    const[loading, setLoading]= useState(true);
    const { token } = useAuth();

    const url= import.meta.env.VITE_BASE_URL || "http://localhost:5001";

    const fetchDocs= async()=>{
        try{
            const res= await axios.get(`${url}/api/documents`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });

            setDocs(res.data.data|| []);
        }catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        if (!token) {
            setLoading(false);
            return;
        }

        fetchDocs();
    }, [token]);

    return { docs , loading, refetch:fetchDocs};
}