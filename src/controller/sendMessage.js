import {sendMessageService} from '../service/sendMessageService.js'



export const sendMessageEmail = (req, res) => {
    let response = sendMessageService(req, res);

}
