import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ArchivedStatusComponent extends Component {
  @tracked model = this.args.model;

  @action
  onArchive(model) {
    this.model.set('archived', !model.archived);
    this.model.save();
  }
}
