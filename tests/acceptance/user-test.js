import {module, test} from 'qunit';
import {visit, currentURL, click} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';

const selectors = {
  title: '[data-test-id="title"]',
  activeUser: '[data-test-id="active-user"]',
  archivedUser: '[data-test-id="archived-user"]',
  statusText: '[data-test-id="status-text"]',
  toggleButton: '[data-test-id="toggle-button"]',
  goToBack: '[data-test-id="go-to-back"]',
}

// We use data from node.js server, since we don't have pretender utils here.
// So before a test run, please make sure node.js server has initial data.
module("Acceptance | user", function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /users/:id', async function (assert) {
    await visit('/users/1');
    assert.equal(currentURL(), '/users/1');
    await visit('/users/2');
  });


  test('The user state on toggle button', async function (assert) {
    assert.expect(5)
    await visit('/users/1');

    assert.dom(selectors.title).hasText('Albert Einstein')

    assert.dom(selectors.statusText).hasText('Status: Active')
    assert.dom(selectors.toggleButton).hasText('Archive')

    await click(selectors.toggleButton)

    assert.dom(selectors.statusText).hasText('Status: Archived')
    assert.dom(selectors.toggleButton).hasText('Unarchive')

    await click(selectors.toggleButton)
  });

  test('The user is show/hidden in the list depending on toggle state', async function (assert) {
    assert.expect(3)
    await visit('/users');

    const title = 'Albert Einstein';

    assert.dom(selectors.activeUser).hasText(title, `The ${title} should be shown in the list`);
    await click(selectors.activeUser)

    await click(selectors.toggleButton)
    await click(selectors.goToBack)

    assert.dom(selectors.activeUser).doesNotContainText(title, `The ${title} should be absent in the list`);

    await visit('/users/1');
    await click(selectors.toggleButton)
    await click(selectors.goToBack)

    assert.dom(selectors.activeUser).hasText(title, `The ${title} should be shown in the list`);
  });
});
