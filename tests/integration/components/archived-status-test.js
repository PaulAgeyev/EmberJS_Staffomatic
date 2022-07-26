import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

const selectors = {
  statusText: '[data-test-id="status-text"]',
  toggleButton: '[data-test-id="toggle-button"]',
}

module("Integration | Component | archived-status", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders with active status", async function(assert) {
    assert.expect(2);

    this.set("model", {archived: false});
    await render(hbs`<ArchivedStatus @model={{this.model}} />`);

    assert.equal(this.element.querySelector(selectors.statusText).textContent.trim(), "Status: Active");
    assert.equal(this.element.querySelector(selectors.toggleButton).textContent.trim(), "Archive");
  });

  test("it renders with archived status", async function(assert) {
    assert.expect(2);

    this.set("model", {archived: true});
    await render(hbs`<ArchivedStatus @model={{this.model}} />`);

    assert.equal(this.element.querySelector(selectors.statusText).textContent.trim(), "Status: Archived");
    assert.equal(this.element.querySelector(selectors.toggleButton).textContent.trim(), "Unarchive");
  });
});
