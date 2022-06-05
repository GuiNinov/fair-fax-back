import db from '../database/pg';

class Company {
  async create(data: any) {
    const req = await db('companies').returning('*').insert(data).orderBy('id');
    return req;
  }
  async update(id: any, data: any) {
    console.log('chamou');

    const req = await db('companies')
      .returning('*')
      .update({ ...data })
      .where('id', id);
    return req;
  }
  async findById(id: number) {
    const req = await db('companies').where({ id: id });
    return req;
  }

  async findAll() {
    const req = await db('companies').orderBy('id');
    return req;
  }

  async findByPhase(phase: string) {
    const req = await db('companies').where('phase', phase);
    return req;
  }
}

export default new Company();
