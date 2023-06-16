import { useSelector } from "react-redux"
import { RootState } from "../state/reducers"

function isOwned(userId: string) {
    
    const auth = useSelector((state: RootState) => state).auth
    console.log(userId, auth['id'])
          return (auth['id'] ==  userId)
}

export default isOwned
