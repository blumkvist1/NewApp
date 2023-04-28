import { Form } from "./Form";
import{useDispatch} from 'react-redux';
import { setUser } from "store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate, redirect} from 'react-router-dom'
const Login =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin=(email, password)=>{
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            console.log(user);
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.acsessToken,
            }));
            console.log(email, password)
            navigate('/path/to');
        })
        .catch(console.error)
    }
    return (
        <Form
            title="sign in"
            handleClick={handleLogin}
        />
    )
}

export {Login}