import { Response } from 'express'

const buildResponse = (res:Response, content:any, valid:boolean, message:string, status_code:number) => {
    res.setHeader('Access-Control-Allow-Origin', '*')  
    return res.status(status_code).json({
        content,
        valid,
        message,
        status_code
      })
    }      
    
export { buildResponse }