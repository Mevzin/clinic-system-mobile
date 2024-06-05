import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { CreatePatientFormData, PatientData } from "../utils/schemas/types";
import { patientSchema } from "../utils/schemas/schemas";


const PATIENT_FIRESTORE_KEY = 'patients'

export async function allPatientsByDoctorId(doctorId: string): Promise<PatientData[]> {
    const patientList: PatientData[] = []
    const db = getFirestore()

    const q = query(
        collection(db, PATIENT_FIRESTORE_KEY),
        where('doctorId', '==', doctorId),
    )

    const querySnap = await getDocs(q)

    querySnap.forEach((doc) => {
        const patient = patientSchema.parse({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
            email: doc.data().email,
            anamnesisId: doc.data().anamnesisId ? doc.data().anamnesisId : '',
        })
        patientList.push(patient)
    })

    return patientList
}

export async function patientById(patientId: string): Promise<PatientData> {
    const db = getFirestore()

    const docRef = doc(db, PATIENT_FIRESTORE_KEY, patientId)
    const patientSnap = await getDoc(docRef)

    if (patientSnap.exists()) {
        return patientSchema.parse({
            id: patientSnap.id,
            ...patientSnap.data(),
            anamnesisId: patientSnap.data().anamnesisId
                ? patientSnap.data().anamnesisId
                : '',
        })
    } else {
        throw new Error('Usuário não encontrado!')
    }
}

export async function createPatient(patientData: CreatePatientFormData) {
    const db = getFirestore()

    await addDoc(collection(db, PATIENT_FIRESTORE_KEY), patientData).catch(
        (error) => {
            throw new Error(error.message)
        },
    )
}