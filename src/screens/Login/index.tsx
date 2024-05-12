import { Alert, Button, Text, TextInput } from "react-native";
import { Container, Title } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    full_name: z.string().min(3, 'full name must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    });

export default function Login() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
        email: '',
        full_name: '',
        password: '',
        },
        resolver: zodResolver(formSchema),
        });
      
    const onSubmit = (data)=>{
        Alert.alert("Successful", JSON.stringify(data))
    }
    return(
        <Container >
          <Text className="text-white ">Simple Login Form</Text>
  
          <Button
            title='Submit'
            onPress={handleSubmit(onSubmit)}
          />
        </Container>
    )
}