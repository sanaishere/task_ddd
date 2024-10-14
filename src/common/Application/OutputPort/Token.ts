export const TokenGenerator=Symbol('TokenGenerator').valueOf()
export interface TokenGenerator {
    sign(payload:any,expireIn:string) :string
    verify(token:string) :any
}