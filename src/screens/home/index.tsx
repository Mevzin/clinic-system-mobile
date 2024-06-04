import { Text, View } from "react-native";
import { useAuth } from "../../hook/Auth";

export default function Home() {
    const { user } = useAuth()


    return (
        <View className="flex-1  bg-slate-900">
            <Text className="m-4 text-white text-2xl font-bold">Bem Vindo, {user?.name}!</Text>
            <View className="gap-3">
                <View className="justify-center items-center flex-row w-[90%] h-[4rem] border-solid border-[1px]  border-sky-500 mx-auto rounded-md">
                    <Text className="text-white text-xl m-2 font-bold">Pacientes cadastrados:</Text>
                    <Text className="text-white text-xl font-bold">32</Text>
                </View>
                <View className="justify-center items-center flex-row w-[90%] h-[4rem] border-solid border-[1px]  border-sky-500 mx-auto rounded-md">
                    <Text className="text-white text-xl m-2 font-bold">Consultas para hoje:</Text>
                    <Text className="text-white text-xl font-bold">32</Text>
                </View>
                <View className="justify-center items-center flex-row w-[90%] h-[4rem] border-solid border-[1px]  border-sky-500 mx-auto rounded-md">
                    <Text className="text-white text-xl m-2 font-bold">Proximo paciente:</Text>
                    <Text className="text-white text-xl font-bold">Ana Laura Silva</Text>
                </View>
                <View className="justify-center items-center flex-row w-[90%] h-[4rem] border-solid border-[1px]  border-sky-500 mx-auto rounded-md">
                    <Text className="text-white text-xl m-2 font-bold">Pacientes confirmados hoje:</Text>
                    <Text className="text-white text-xl font-bold">20</Text>
                </View>
                <View className="justify-center items-center flex-row w-[90%] h-[4rem] border-solid border-[1px]  border-sky-500 mx-auto rounded-md">
                    <Text className="text-white text-xl m-2 font-bold">Pacientes não confirmados:</Text>
                    <Text className="text-white text-xl font-bold">32</Text>
                </View>
            </View>
        </View>
    )
}