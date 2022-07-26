import Route from '@ember/routing/route';

export default class UsersRoute extends Route {
  queryParams = {
    archived: {
      refreshModel: true,
    },
  };

  model(params) {
    const filterParams = {};
    if ('archived' in params && params.archived !== null) {
      Object.assign(filterParams, params);
    }

    return this.store.query('user', { filter: filterParams });
  }
}
