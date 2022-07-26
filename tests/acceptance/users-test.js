import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const selectors = {
  activeUser: '[data-test-id="active-user"]',
  archivedUser: '[data-test-id="archived-user"]',
  seeAllUsers: '[data-test-id="see-all-users"]',
  toggleUsers: '[data-test-id="toggle-users"]',
}

module("Acceptance | users", function(hooks) {
  setupApplicationTest(hooks);

  test("visiting /users", async function(assert) {
    assert.expect(1)

    await visit("/users");
    assert.equal(currentURL(), '/users');
  });

  test("Only active users are shown by default", async function(assert) {
    assert.expect(2)

    await visit("/");
    await click(selectors.seeAllUsers)

    assert.dom(selectors.activeUser).exists();
    assert.dom(selectors.archivedUser).doesNotExist();
  });

  test("Archived users are shown", async function(assert) {
    assert.expect(2)

    await visit("/users");
    assert.dom(selectors.archivedUser).exists();
    assert.dom(selectors.toggleUsers).isChecked();
  });

  test("Archived active users are not shown if query param is applied", async function(assert) {
    assert.expect(2)

    await visit("/users?archived=false");
    assert.dom(selectors.archivedUser).doesNotExist();
    assert.dom(selectors.toggleUsers).isNotChecked();
  });

  test('"Show archived users" checkbox is checked with filter and query param', async function (assert) {
    assert.expect(3)

    await visit('/users');

    assert.equal(currentURL(), '/users');
    await click(selectors.toggleUsers);
    assert.equal(currentURL(), '/users?archived=false');

    assert.dom(selectors.archivedUser).doesNotExist();
  });

  test('"Show archived users" checkbox is unchecked with filter and query param', async function (assert) {
    assert.expect(3)

    await visit('/users?archived=false');

    assert.equal(currentURL(), '/users?archived=false');
    await click(selectors.toggleUsers);
    assert.equal(currentURL(), '/users');

    assert.dom(selectors.archivedUser).exists();
  });
});
