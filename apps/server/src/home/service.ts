class HomeService {
  private homeCollection: any;
  constructor(homeCollection: any) {
    this.homeCollection = homeCollection;
  }

  public async get() {
    return {
      home: "from service get",
    };
  }

  public async post() {
    return {
      home: "from service post"
    }
  }
}

export default HomeService;