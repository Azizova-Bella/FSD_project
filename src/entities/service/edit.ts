import { IUser } from '../table-user/model/types'
export default function editService(data: IUser[], editedUser: IUser): IUser[] {
  return data.map(user => (user.id === editedUser.id ? editedUser : user))
}

