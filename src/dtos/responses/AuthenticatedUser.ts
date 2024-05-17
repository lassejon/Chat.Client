export default class AuthenticatedUser {
    id: string = ''
    email: string = ''
    firstName: string = ''
    lastName: string = ''
    token: string = ''
    validTo: Date = new Date()
}