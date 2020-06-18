import IStorageProvider from '../models/IStorageProvider';
import fs from 'fs';
import uploadConfig from '@config/upload';
import path from 'path';

export default class DiskStorageProvider implements IStorageProvider {

  public async save(file: string): Promise<string> {
    await fs.promises.rename(path.resolve(uploadConfig.path, file), path.resolve(uploadConfig.path, file));

    return file;
  }

  public async delete(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.path, file);

    try{
      await fs.promises.stat(filePath);
    } catch(err){
      return;
    }

    await fs.promises.unlink(filePath);
  }

}
