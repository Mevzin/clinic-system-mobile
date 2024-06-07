import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { PatientData } from "../../utils/schemas/types";
import { allPatientsByDoctorId } from "../../services/patient";
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { useAuth } from "../../hook/Auth";
import { Skeleton } from "../../components/Skeleton";

export default function Patients() {

    const [patientList, setPatientList] = useState<PatientData[]>([])
    const { user } = useAuth()


    useMemo(async () => {
        setPatientList(await allPatientsByDoctorId(user.id))
    }, [])

    console.log(patientList)
    function handleAnamnesis(anamnesisId: string | undefined) {
        if (anamnesisId) {
            return (
                <View className="justify-center items-center w-[2.6rem] h-[2.6rem] rounded-lg bg-green-600">
                    <MaterialIcons
                        name="playlist-add-check"
                        size={28}
                        color="#FFF"
                    />
                </View>
            )
        } else {
            return (
                <View className="justify-center items-center w-[2.6rem] h-[2.6rem] rounded-lg bg-red-600">
                    <MaterialIcons
                        name="playlist-remove"
                        size={28}
                        color="#FFF"
                    />
                </View>
            )
        }

    }


    return (
        <View className="flex-1  bg-slate-900">
            <View className="flex-row m-4 justify-between items-center">
                <Text className="text-white text-2xl font-bold">Pacientes Cadastrados</Text>
                <View className="">
                    <Feather
                        name="user-plus"
                        color="#FFF"
                        size={24}
                    />
                </View>
            </View>
            <View className="w-[full] border-b-[0.05rem] border-slate-700"></View>
            {patientList != undefined ? (
                <ScrollView>
                    <View className="flex-1 items-center">
                        {patientList.map((patient) => {
                            return (
                                <View key={patient.id} className="flex-row w-[95%] h-[6rem] border border-slate-500 rounded-md drop-shadow-lg my-2">
                                    <View className="flex-1 justify-center h-full border-r border-slate-500">
                                        <Text className="text-white text-xl font-bold ml-2">{patient.name}</Text>
                                        <Text className="text-white text-xl font-bold ml-2">{patient.email}</Text>
                                    </View>
                                    <View className="justify-center items-center w-[4rem]">
                                        {handleAnamnesis(patient.anamnesisId)}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            ) : (
                <ScrollView>
                    <View className="flex-1 items-center">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <View key={index} className="flex-row w-[95%] h-[6rem] border border-slate-500 rounded-md drop-shadow-lg my-2">
                                <View className="flex-1 justify-center h-full border-r border-slate-500">
                                    <Skeleton className="ml-2 h-[1.75rem] w-10" />
                                    <Skeleton className="ml-2 h-[1.75rem] w-10" />
                                </View>
                                <View className="justify-center items-center w-[4rem]">
                                    <Skeleton className="justify-center items-center w-[2.6rem] h-[2.6rem] rounded-lg " />
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    )
}