
import { useRealmApp } from "../store/realm";

const LoginAPI = (props) => {


  const API_KEY = "X6vbOvQjCACWfxM0IMCGmS8u1j5mPLqL5YnoQFu99dPqn5UnSzGXOeFJ0mp7ZzbB"
   
  const { loginApiKey, logOut, user } = useRealmApp();


    async function handleLogIn() {
        //await logIn(email, password);
        await loginApiKey(API_KEY);
      }


    return {handleLogIn};
}

export default  LoginAPI;