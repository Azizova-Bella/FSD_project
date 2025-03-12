import { IUser } from '../../entities/table-user/model/types'

export default function addService(data: IUser[], 
	newUser: IUser): IUser[] {
  return [...data, newUser]
}
