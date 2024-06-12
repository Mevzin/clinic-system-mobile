import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { PatientData } from '../../../utils/schemas/types';
import { useAuth } from '../../../hook/Auth';
import { FontAwesome5 } from '@expo/vector-icons'
interface DetailsPatientModalProps {
    isOpen?: boolean
}

export interface DetailsPatientModalRef {
    onOpen: (patientData: PatientData) => void
}

// eslint-disable-next-line react/display-name
export const DetailsPatientModal = forwardRef<
    DetailsPatientModalRef,
    DetailsPatientModalProps
>(({ isOpen = false }: DetailsPatientModalProps, ref) => {
    const modalizeRef = useRef<Modalize>(null);
    const [patient, setPatient] = useState<PatientData>({} as PatientData)
    const { user } = useAuth();
    useImperativeHandle(ref, () => ({
        onOpen(patientData: PatientData) {
            modalizeRef.current?.open();
            setPatient(patientData)
        }
    }))

    return (
        <>
            <Modalize ref={modalizeRef} modalHeight={600} modalStyle={{ backgroundColor: '#9ca3af' }}>
                <ScrollView>
                    <View className='m-3'>
                        <Text className='text-white font-bold text-2xl'> Detalhes do paciente</Text>
                        <View className='flex-row justify-between mx-[1rem] py-[0.5rem] my-[0.5rem] border-y border-slate-500'>
                            <View className='justify-center'>
                                <Text className='text-gray-100 font-semibold text-lg'>{patient.name}</Text>
                                <Text className='text-gray-100 font-semibold text-lg'>{patient.age}</Text>
                                <Text className='text-gray-100 font-semibold text-lg'>{patient.email}</Text>
                            </View>
                            <View>
                                {patient.profileURL ?
                                    <Image
                                        className='w-[8rem] h-[8rem] rounded-full border-2 border-slate-500'
                                        source={{ uri: user.photoURL }}
                                    /> :
                                    <FontAwesome5
                                        className='w-[8rem] h-[8rem]'
                                        name='user-circle'
                                        size={112}
                                        color={''}
                                    />
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modalize>
        </>
    );
})