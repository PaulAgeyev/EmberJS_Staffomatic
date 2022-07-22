import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ArchivedStatusComponent extends Component {
  @tracked _onArchive = this.args.onArchive;

  @action
  onArchive() {
    this._onArchive();
  }
}
