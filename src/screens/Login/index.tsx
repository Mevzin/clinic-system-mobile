import { Alert, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { SignInUserFormData } from "../../utils/types";
import { signInUserFormSchema } from "../../utils/schemas";
import { Button } from "../../components/Button";

const formSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    full_name: z.string().min(3, 'full name must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    });

export default function Login() {
    const form = useForm<SignInUserFormData>({
      resolver: zodResolver(signInUserFormSchema),
      defaultValues: {
        email: '',
        password: '',
      }
    })
      
        function handleSubmit() {}

    return(
        <View className="flex-1 justify-center items-center bg-slate-900">
          <Text className="text-white">Login</Text>
  
          <Button 
            label="SignIn"
            className="h-[3rem] w-[6rem] bg-blue-500 "
          />
            

        </View>
    )
}