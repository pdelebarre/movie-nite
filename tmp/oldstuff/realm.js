import * as RealmWeb from "realm-web"

import React, { useContext, useState } from "react"

import { REALM_APP_ID, MONGODB_API_KEY } from "./keys";

const RealmAppContext = React.createContext(null)

const RealmApp = ({ children }) => {
 
    
    const app = new RealmWeb.App({ id: REALM_APP_ID })
    const [user, setUser] = useState(null)

    const loginApiKey = async () => {
        const credentials = RealmWeb.Credentials.apiKey(MONGODB_API_KEY)
        try {
            await app.logIn(credentials)
            setUser(app.currentUser)
            return app.currentUser
        } catch (e) {
            setUser(null)
            return null
        }
    }

    const logOut = () => {
        if (user !== null) {
            app.currentUser.logOut()
            setUser(null)
        }
    }

    return (
        <RealmAppContext.Provider
            value={{
                loginApiKey,
                logOut,
                user,
            }}
        >
            {children}
        </RealmAppContext.Provider>
    )
}

export const useRealmApp = () => {
    const realmContext = useContext(RealmAppContext)
    if (realmContext == null) {
        throw new Error("useRealmApp() called outside of a RealmApp?")
    }
    return realmContext
}

export default RealmApp