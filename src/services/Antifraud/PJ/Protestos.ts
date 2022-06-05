import { postRequest } from '../../../helpers/requestHelper';
import AntifraudPj from '../../../models/Company';
class ProtestosPj {
  url: string | undefined;
  data: {
    doc: string;
    id?: number;
  };
  analysis_id?: number;

  constructor(url: string | undefined, cnpj: string, analysis_id?: number) {
    this.url = url;
    this.analysis_id = analysis_id;
    this.data = { doc: cnpj, id: analysis_id };
  }

  async find() {
    try {
      postRequest(
        'https://ljlx0qs4ng.execute-api.us-east-2.amazonaws.com/dev',
        '/protestos',
        this.data
      );

      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export default ProtestosPj;
