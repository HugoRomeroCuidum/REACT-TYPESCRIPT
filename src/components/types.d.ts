export interface Sub {
  nick: string
  avatar: string
  subMonths: number
  description?: string
  gender: string;
}

export type SubsResponseFromApi = Array <{
nick: string
months: number
profileUrl: string
description: string
gender: string
}>