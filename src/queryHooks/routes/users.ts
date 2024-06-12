import { validationsParamsGetUsers } from '@/queryHooks/useUser'

const APIUsers = {
  createUser: '/users/create',
  getUsers: ({ limit, offset, typeUser, active }: validationsParamsGetUsers) =>
    `users?limit=${limit}&offset=${offset}&typeUser=${typeUser ? typeUser : ''}&active=${active ? active : ''}`,
}

export default APIUsers
