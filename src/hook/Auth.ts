import { ReactNode, useState } from "react"
import { SignInUserFormData, UserData } from "../utils/types"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { userSchema } from "../utils/schemas"
interface AuthProviderProps {
  children: ReactNode
}


export function AuthProvider({ children }: AuthProviderProps) {

  const auth = getAuth()
  const db = getFirestore()
  const [data, setData] = useState<UserData>(() => {
    const user = localStorage.getItem('@ClinicSystem:user')

    if (user) {
      return JSON.parse(user)
    }

    return {} as UserData
  })

  async function signIn(userData: SignInUserFormData): Promise<void> {
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async (userCredential) => {
        const docRef = doc(db, 'users', userCredential.user.uid)
        const userFirestore = await getDoc(docRef)
        const userData = userSchema.parse(userFirestore.data())
        setData(userData)

        localStorage.setItem('@ClinicSystem:user', JSON.stringify(userData))
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }
}