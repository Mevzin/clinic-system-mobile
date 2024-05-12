import { Text,  View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInUserFormData } from "../../utils/types";
import { signInUserFormSchema } from "../../utils/schemas";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import  FormInput  from "../../components/FormController";

export default function Login() {
  
    const {control, handleSubmit} = useForm<SignInUserFormData>({
      resolver: zodResolver(signInUserFormSchema),
      defaultValues: {
        email: '',
        password: '',
      }
    })

    const inputList = [
      {
        name: 'email',
        label: 'E-mail',
        placeholder: 'E-mail',
      },
      {
        name: 'password',
        label: 'Senha',
        placeholder: 'Senha',
        type: 'password',
      },
    ]

    const signInUser = (data: SignInUserFormData) => console.log(data) 

    return(
        <View className="flex-1 justify-center items-center bg-slate-900">
          <Text className="text-white font-bold text-2xl">Login</Text>
          {/* <Controller 
            name='email'
            control={control}
            render={({field: {value, onChange } }) => (
              <Input 
              label="E-mail"
              className="w-[20rem] my-3"
              labelClasses="text-white"
              inputClasses="border-white border-2 text-white"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
            />
            )}
          />

          <Controller 
            name='password'
            control={control}
            render={({field: {value, onChange } }) => (
              <Input 
                label="Senha"
                key='password'
                secureTextEntry
                className="w-[20rem] mb-6"
                labelClasses="text-white"
                inputClasses="border-white border-2 text-white"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
              /> 
            )}
          /> */}
          
          <FormInput
            control={control}
            name={'email'}
            label="Email"
            className="w-[20rem] my-3"
            autoCapitalize={false}
          />
          <FormInput
            control={control}
            name={'password'}
            className="w-[20rem] my-3"
            label="Senha"
            secureTextEntry={true}
            autoCapitalize={false}
          />
          <Button 
            label="Sign In"
            labelClasses="text-white"
            className="bg-cyan-800 mt-3"
            size='lg'
            onPress={handleSubmit(signInUser)}
          />
            

        </View>
    )
}