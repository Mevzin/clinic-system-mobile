import { useMemo, useRef, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator, Button } from "react-native";
import { PatientData } from "../../utils/schemas/types";
import { allPatientsByDoctorId } from "../../services/patient";
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { useAuth } from "../../hook/Auth";
import { DetailsPatientModal, DetailsPatientModalRef } from "./details-patient-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

export default function Patients() {
    const detailsPatientModalRef = useRef<DetailsPatientModalRef>(null)
    const [patientList, setPatientList] = useState<PatientData[]>([])
    const { user } = useAuth()


    // useMemo(async () => {

    //     setPatientList(await allPatientsByDoctorId(user.id))
    // }, [])

    useFocusEffect(
        () => {
            const getPatientList = async () => {
                setPatientList(await allPatientsByDoctorId(user.id))
            }

            getPatientList()
        }
    )

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
                <View className="justify-center items-center w-[2.6rem] h-[2.6rem] rounded-lg bg-red-500">
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
            <DetailsPatientModal ref={detailsPatientModalRef} />
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
                                <TouchableOpacity key={patient.id} onPress={() => detailsPatientModalRef.current?.onOpen(patient)}>
                                    <View className="flex-row w-[25rem] h-[6rem] border border-slate-500 rounded-lg drop-shadow-lg my-2 bg-slate-400">
                                        <View className="flex-1 justify-center h-full border-r border-slate-500">
                                            <Text className="text-white text-xl font-bold ml-2">{patient.name}</Text>
                                            <Text className="text-white text-xl font-bold ml-2">{patient.email}</Text>
                                        </View>
                                        <View className="justify-center items-center w-[4rem]">
                                            {handleAnamnesis(patient.anamnesisId)}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            ) : (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size={60} color={"#FFF"} />
                </View>
            )}
        </View>
    )
}