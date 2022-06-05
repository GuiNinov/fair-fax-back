import BasicData from './Antifraud/PJ/BasicData';
import AntifraudPjModel from '../models/Company';
import Addressess from './Antifraud/PJ/Addresses';
import CapTable from './Antifraud/PJ/CapTable';
import Activity from './Antifraud/PJ/Activity';
import Processos from './Antifraud/PJ/Processos';
import QsaProcesses from './Antifraud/PJ/QsaProcesses';
import Partners from './Antifraud/PJ/Partners';
import SpcPj from './Antifraud/PJ/SpcPj';
import ProtestosPj from './Antifraud/PJ/Protestos';

class AntifraudPjService {
  url: string | undefined;
  cnpj: string;
  analysis_id?: number;

  constructor(cnpj: string, company_id: number) {
    this.url = process.env.ANTIFRAUD_PJ_API;

    this.cnpj = cnpj;

    this.analysis_id = company_id;
  }

  async action() {
    // Salvando os dados básico
    await this.basicData();

    await Promise.all([
      // Salvando os endereços
      this.addressess(),

      // Salvando o Cap Table da emrpesa
      this.capTable(),

      // Salvando os dados sobre a atividade da empresa
      this.activity(),

      // Salvando os dados sobre os processos da empresa
      this.processes(),

      // Salvando os dados sobre os processos QSA
      this.qsaProcesses(),

      // Salvando os dados sobre os Funcionários e Sócios
      this.partners(),

      // Salvando os dados da SPC (Crédito)
      this.spc(),
    ]);

    // Retornando os dados agrupados

    return { valid: true };
  }

  // Salvando os dados básico
  private async basicData() {
    try {
      const basicData = new BasicData(this.url, this.cnpj);
      const res = await basicData.find();
      if (res) {
        await AntifraudPjModel.update(this.analysis_id, {
          basic_data: { ...res },
        });
      }

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - Basic Data',
        valid: false,
      };
    }
  }

  // Salvando os dados de endereço
  private async addressess() {
    try {
      const addressess = new Addressess(this.url, this.cnpj);
      const res = await addressess.find();
      if (res) {
        await AntifraudPjModel.update(this.analysis_id, {
          addressess: res,
        });
      }

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - Address',
        valid: false,
      };
    }
  }

  // Salvando os dados do quadro societário
  private async capTable() {
    try {
      const capTable = new CapTable(this.url, this.cnpj);
      const res = await capTable.find();

      await AntifraudPjModel.update(this.analysis_id, {
        cap_table: res,
      });

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - Cap Table',
        valid: false,
      };
    }
  }

  // Salvando os dados sobre a atividade da empresa
  private async activity() {
    try {
      const activity = new Activity(this.url, this.cnpj);
      const res = await activity.find();

      await AntifraudPjModel.update(this.analysis_id, {
        activity: res,
      });

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - Activity',
        valid: false,
      };
    }
  }

  // Salvando os dados sobre os processos da empresa
  private async processes() {
    try {
      const processos = new Processos(this.url, this.cnpj);
      const res = await processos.find();

      await AntifraudPjModel.update(this.analysis_id, {
        processos: res,
      });

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - Processes',
        valid: false,
      };
    }
  }

  // Salvando os dados sobre os processos QSA da empresa
  private async qsaProcesses() {
    try {
      const qsaProcesses = new QsaProcesses(this.url, this.cnpj);
      const res = await qsaProcesses.find();

      await AntifraudPjModel.update(this.analysis_id, {
        processos_qsa: res,
      });

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - QSA Processes',
        valid: false,
      };
    }
  }

  // Salvando os dados sobre os processos QSA da empresa
  private async partners() {
    try {
      const relations = new Partners(this.url, this.cnpj);
      const res = await relations.find();

      await AntifraudPjModel.update(this.analysis_id, {
        relations: res,
      });

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - Sócios e Funcionários',
        valid: false,
      };
    }
  }

  // Salvando os dados sobre os processos QSA da empresa
  private async spc() {
    try {
      const spcPj = new SpcPj(this.url, this.cnpj);
      const res = await spcPj.find();

      await AntifraudPjModel.update(this.analysis_id, {
        spc: res,
      });

      return res;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - SPC',
        valid: false,
      };
    }
  }

  async protesto() {
    try {
      const protesto = new ProtestosPj(this.url, this.cnpj, this.analysis_id);
      protesto.find();
      return;
    } catch (error: any) {
      console.log(error);
      return {
        error: 'Problemas internos na API de DV PJ - SPC',
        valid: false,
      };
    }
  }
}

export default AntifraudPjService;
