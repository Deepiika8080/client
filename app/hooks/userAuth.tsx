import { useSelector } from "react-redux";

type RootState = {
    auth: {
      user: {     
        image?: string;
      }
    }
  }

export default function UserAuth() {
    const {user} = useSelector((state:RootState) => state.auth);
    console.log("user",user);
    return !!user;
}