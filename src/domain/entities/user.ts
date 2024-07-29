import { Model } from 'sequelize'

export interface UserAttributes {
  id?: string
  uname: string
  email: string
  verified_email?: boolean
  passwd: string
  createdAt?: Date
}

export class UserEntity extends Model<UserAttributes> {
  get verified_email(): boolean {
    return this.verified_email
  }

  set verified_email(state: boolean) {
    this.verified_email = state
  }

  get passwd(): string {
    return this.passwd
  }

  set passwd(value: string) {
    this.passwd = value
  }

  get id(): string {
    return this.id
  }

  get uname(): string {
    return this.uname
  }

  get email(): string {
    return this.email
  }

  get createdAt(): Date {
    return this.createdAt
  }
}
