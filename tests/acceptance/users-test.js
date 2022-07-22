import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

// We use data from node.js server, since we don't have pretender utils here.
// So before a test run, please make sure node.js server has initial data.
module("Acceptance | users", function(hooks) {
  setupApplicationTest(hooks);

  test("visiting /users", async function(assert) {
    await visit("/users");

    assert.equal(currentURL(), "/users");
    assert.deepEqual(getUsers(), allUsers, "All users are shown");

    await click("#toggle-users");
    assert.deepEqual(getUsers(), activeUsers, "Active users are shown");

    await click(".user");
    await click("#archive-button");
    await click("#go-to-back");

    assert.deepEqual(getUsers(), activeUsers.slice(1), "The first active user was archived");
  });
});

const activeUsers = [
  'Albert Einstein',
  'Walt Disney',
  'Bruce Lee',
]

const archivedUsers = [
  'Neil Armstrong',
]

const allUsers = [
  ...activeUsers,
  ...archivedUsers,
]

const getUsers = () => {
  return [...document.querySelectorAll(".user")]
    .map(a => a.textContent.trim());
}
