import { IUser } from '../table-user/model/types'

export default function deleteService(data: IUser[], id: number | string): IUser[] {
  return data.filter(user => user.id !== id)
}
