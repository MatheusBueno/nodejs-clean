/**
 * Authentication interface is a gateway between an application and
 * authentication related system
 */
class Authentication {
  uniqueIdAdapter: any;
  webTokenAdapter: any;

  constructor(options) {
    this.uniqueIdAdapter = options.UniqueIdAdapter;
    this.webTokenAdapter = options.WebTokenAdapter;
  }

  getNewUserId() {
    return this.uniqueIdAdapter.generate();
  }

  getNewWebToken(options) {
    return this.webTokenAdapter.generate(options);
  }
}

export default Authentication;
