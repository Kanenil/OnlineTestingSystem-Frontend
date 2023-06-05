export interface IBaseResponseModel {
  id: number,
  success: boolean,
  message: string,
  errors?: string[]
}
