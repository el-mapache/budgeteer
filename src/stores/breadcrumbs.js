var _parts = [];

class BreadcrumbStore {
  constructor() {
    //dispatcher.register - > update parts
  }

  getParts() {
    return _parts;
  }

  setParts(parts) {
    _parts = parts;
  }
}

module.exports = BreadcrumbStore;
