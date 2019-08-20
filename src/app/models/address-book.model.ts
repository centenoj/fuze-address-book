import { ContactGroup } from './contact-group.model';
import { Contact } from './contact.model';

export class AddressBook {

  constructor(
    public id: string,
    public username: string,
    private password: string,
    public groups: ContactGroup[],
    public contacts: Contact[]
  ) {}
}
