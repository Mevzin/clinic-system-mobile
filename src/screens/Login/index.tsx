import { Alert, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { SignInUserFormData } from "../../utils/types";
import { signInUserFormSchema } from "../../utils/schemas";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

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
          <Text className="text-white font-bold text-2xl">Login</Text>

          <Input 
            label="E-mail"
            className="w-[20rem] my-3"
            labelClasses="text-white"
            inputClasses="border-white border-2 text-white"
          />

          <Input 
            label="Senha"
            secureTextEntry={true}
            className="w-[20rem] mb-6"
            labelClasses="text-white"
            inputClasses="border-white border-2 text-white"
          />

          <Button 
            label="SignIn"
            labelClasses="text-white"
            className="bg-cyan-800"
            size='lg'
          />
            

        </View>
    )
}