import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UsersController extends Controller {
  queryParams = ['archived'];
  @tracked archived = null;

  @action
  toggleUsers() {
    const transitionTo = (queryParams) => this.target.transitionTo('users', queryParams);

    if (this.archived) {
      transitionTo({ queryParams: { archived: undefined } });
    } else {
      transitionTo({ queryParams: { archived: false } });
    }
  }
}
