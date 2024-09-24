// import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"
  

export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { user } = useUser();
   
    useEffect(() => {
      
      if (user) navigate('/')
    }, []);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{

            const { data } = await axios.post('/api/user/register-user', formData);
            toast.success("successfully registered");
            setLoading(false);
            navigate('/login');

        }catch(e){
          setLoading(false);
          toast.error(e.response.data);
          console.error(e);  
        }
    }

  return (
    <div className="w-full">

    <Card>
  <CardHeader>
    <CardTitle>Register With Your Info </CardTitle>
    <CardDescription>Register With Your Info</CardDescription>
  </CardHeader>
  <CardContent>
  <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input 
              onChange={handleInputChange}
              id="username" placeholder="Enter Your Username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
              onChange={handleInputChange} 
              id="email" placeholder="Enter Your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
              type="password"
              onChange={handleInputChange}
              id="password" placeholder="Enter Your Password" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button>{loading ? "Registering..." : "Register"}</Button>
            </div>
          </div>
        </form>
  </CardContent>

</Card>

</div>
  )
}
