class HomeService {
  private homeCollection:any;
  constructor(homeCollection:any) {
    this.homeCollection = homeCollection;
  }

  public async get() {
    return {
      home: 'from service'
    }
  }
}

export default HomeService;