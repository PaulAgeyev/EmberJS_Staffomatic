import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | archived-status", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders with active status", async function(assert) {
    assert.expect(2);

    this.set("isArchived", false);
    await render(hbs`<ArchivedStatus @isArchived={{this.isArchived}} />`);

    assert.equal(this.element.querySelector("#status-text").textContent.trim(), "Status: Active");
    assert.equal(this.element.querySelector("#archive-button").textContent.trim(), "Archive");
  });

  test("it renders with archived status", async function(assert) {
    assert.expect(1);

    this.set("isArchived", true);
    await render(hbs`<ArchivedStatus @isArchived={{this.isArchived}} />`);

    assert.equal(this.element.querySelector("#status-text").textContent.trim(), "Status: Archived");
  });
});
