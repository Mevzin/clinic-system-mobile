import { Text,  View, ToastAndroid } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInUserFormData, SignUpUserFormData } from "../../utils/schemas/types";
import { signUpUserFormSchema } from "../../utils/schemas/schemas";
import { Button } from "../../components/Button";
import  FormInput  from "../../components/FormController";
import { useAuth } from "../../hook/Auth";
import { FIREBASE_ERROR } from "../../utils/errors/firebase_errors";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  
    const { signUp } = useAuth()
    const navigation = useNavigation();
    const {control, handleSubmit} = useForm<SignUpUserFormData>({
        resolver: zodResolver(signUpUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    async function signUpUser(data: SignUpUserFormData) {
      try {
        await signUp(data)
      } catch (error) {
        if((error as Error).message === FIREBASE_ERROR.EMAIL_EXISTIS){
          ToastAndroid.show("Não foi possivel efetuar o cadastro!", 5000)
        }
      }
    } 

    return(
        <View className="flex-1 justify-center items-center bg-slate-900">
            <Button 
                label="Login ->"
                labelClasses="text-white"
                className="mt-3 top-1 left-2 absolute"
                size='default'
                onPress={() => navigation.navigate('SignIn')}
            />
          <Text className="text-white font-bold text-2xl">Cadastrar-se</Text>
          <FormInput
            control={control}
            name={'name'}
            label="Nome"
            className="w-[20rem] my-3"
            autoCapitalize={false}
          />
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
         <FormInput
            control={control}
            name={'confirmPassword'}
            className="w-[20rem] my-3"
            label="Senha"
            secureTextEntry={true}
            autoCapitalize={false}
        />
          <Button 
            label="Cadastrar"
            labelClasses="text-white"
            className="bg-cyan-800 mt-3"
            size='lg'
            onPress={handleSubmit(signUpUser)}
          />
        </View>
    )
}