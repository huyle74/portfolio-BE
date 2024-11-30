import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';

@Injectable()
export class portfolioRepository {
  async findAll() {
    const port = await readFile('db.json', 'utf8');
    const allPort = JSON.parse(port);
    const res = allPort.map((port) => {
      return port;
    });
    return res;
  }

  async findOne(id: string) {
    const portProps = await readFile('db.json', 'utf8');
    const allPort = JSON.parse(portProps);
    // console.log(id);
    const port = allPort.filter((port) => {
      return port.id === Number(id);
    });

    return port;
  }

  async createPort(content: any) {
    const allPort = await readFile('db.json', 'utf8');
    const res = JSON.parse(allPort);

    const new_id = Math.floor((Math.random() + 1) * 99999);

    content.id = new_id;

    res.push(content);

    await writeFile('db.json', JSON.stringify(res));
  }

  async delete(id: string) {
    const allPort = await readFile('db.json', 'utf8');
    const res = JSON.parse(allPort);

    const index = res.findIndex((port) => port.id === Number(id));

    res.splice(index, 1);
    // console.log(res);

    await writeFile('db.json', JSON.stringify(res));
  }
}
