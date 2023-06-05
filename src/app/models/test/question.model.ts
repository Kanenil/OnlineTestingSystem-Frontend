import {IAnswerModel} from "./answer.model";

export interface IQuestionModel {
  id: number | string,
  text: string,
  answers: IAnswerModel[]
}
