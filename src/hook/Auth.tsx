import { userSchema } from "../utils/schemas/schemas"
import { ReactNode, createContext, useContext, useState } from "react"
import { GetFirebaseUserData, SignInUserFormData, SignUpUserFormData, UserData } from "../utils/schemas/types"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut as signOutFirebase, } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { MMKV, useMMKV } from 'react-native-mmkv'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: UserData
  signUp(userData: SignUpUserFormData): Promise<void>
  signIn(crendentials: SignInUserFormData): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const storage = new MMKV({id: 'clinicApp'})
  const auth = getAuth()
  const db = getFirestore()
  const [data, setData] = useState<UserData>(() => {
    const user = storage.getString('user')

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
        storage.set('user', JSON.stringify(userData))
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  async function signUp(userData: SignUpUserFormData): Promise<void> {
    const { user }: GetFirebaseUserData = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    ).catch((error) => {
      throw new Error(error.message)
    })

    
    await setDoc(doc(db, 'users', String(user.uid)), {
      id: user.uid,
      name: userData.name,
      photoURL: user.photoURL,
      email: user.email,
    }).catch((error) => {
      console.log(error)
      throw new Error(error.message)
    })
  }

  async function signOut() {
    signOutFirebase(auth)
      .then(() => {
        storage.delete('user')
        setData({} as UserData)
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <AuthContext.Provider
      value={{user: data, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider')
  }

  return context
}