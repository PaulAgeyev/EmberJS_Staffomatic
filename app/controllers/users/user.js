import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class UsersUserController extends Controller {
  @action
  onArchive() {
    this.model.set('archived', true);
    this.model.save();
  }
}
