import { useAuth } from "../../hook/Auth";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from "@react-navigation/native";
import { Text,  View, ToastAndroid } from "react-native";
import  FormInput  from "../../components/FormController";
import { SignInUserFormData } from "../../utils/schemas/types";
import { signInUserFormSchema } from "../../utils/schemas/schemas";
import { FIREBASE_ERROR } from "../../utils/errors/firebase_errors";

export default function SignIn() {
  
    const { signIn } = useAuth()
    const navigation = useNavigation();
    const {control, handleSubmit} = useForm<SignInUserFormData>({
      resolver: zodResolver(signInUserFormSchema),
      defaultValues: {
        email: '',
        password: '',
      }
    })

    async function signInUser(data: SignInUserFormData) {
      try {
        await signIn(data)
      } catch (error) {
        if((error as Error).message === FIREBASE_ERROR.INVALID_CREDENTIAL){
          ToastAndroid.show("Email ou senha invalidos!", 5000)
        }
      }
    } 

    return(
        <View className="flex-1 justify-center items-center bg-slate-900">
            <Button 
              label="Cadastro ->"
              labelClasses="text-white"
              className="mt-3 top-1 left-2 absolute"
              size='default'
              onPress={() => navigation.navigate('SignUp')}
            />
          <Text className="text-white font-bold text-2xl">Login</Text>
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