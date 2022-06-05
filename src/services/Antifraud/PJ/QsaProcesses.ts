import { postRequest } from "../../../helpers/requestHelper";

class QsaProcesses {

    url:string|undefined
    data:{
        doc:string
    }

    constructor(url:string|undefined, cnpj:string){
        this.url = url
        this.data = {doc:cnpj}
    }

    async find() {
        try {
            const res = await postRequest(this.url, '/v1/pj/sync/qsa_processes', this.data)

            return res.data
        } catch (error) {
            return
        }
    }
}

export default QsaProcesses