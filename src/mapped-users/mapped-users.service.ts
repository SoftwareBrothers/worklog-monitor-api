import path from 'path';

import jf from 'jsonfile';
import { Injectable } from '@nestjs/common';

import { DictionaryUser } from './interfaces/dictionary-user.interface';

@Injectable()
export class MappedUsersService {
  private dictionary: DictionaryUser[]; // cache for dictionary

  private readonly DICTIONARY_FILENAME: string = 'users-dictionary.json';

  public getUserByAtlassianId(id: string): DictionaryUser {
    const dictionary = this.readDictionary();
    return dictionary.find(value => value.accountId === id);
  }

  public getUserByEmailAddress(email: string): DictionaryUser {
    const dictionary = this.readDictionary();
    return dictionary.find(value => value.email === email);
  }

  private readDictionary(): DictionaryUser[] {
    if (!this.dictionary) {
      const readDictionary = jf.readFileSync(path.resolve(process.cwd(), this.DICTIONARY_FILENAME), { throws: false });
      this.dictionary = readDictionary || [];
    }
    return this.dictionary;
  }
}
