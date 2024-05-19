export class JwtToken {
    token: string = ''
    validTo: Date = new Date()
}

export default class AuthenticatedUser {
    id: string = ''
    email: string = ''
    firstName: string = ''
    lastName: string = ''
    jwtToken: JwtToken = {
        token: '',
        validTo: new Date()
    }
}