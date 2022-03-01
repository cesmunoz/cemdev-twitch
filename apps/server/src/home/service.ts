class HomeService {
  private homeCollection: object;
  constructor(homeCollection: object) {
    this.homeCollection = homeCollection;
  }

  public async get() {
    return {
      home: 'from service get',
    };
  }

  public async post() {
    return {
      home: 'from service post',
    };
  }
}

export default HomeService;
