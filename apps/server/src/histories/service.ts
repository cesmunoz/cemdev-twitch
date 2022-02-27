class HistoryService {
  private historyCollection: any;
  constructor(historyCollection: any) {
    this.historyCollection = historyCollection;
  }

  public async get() {
    return [
      {
        id: 1,
        command: 'saludar',
        timestamp: '2020-01-01T00:00:00.000Z',
        user: 'cemdev',
      },
      {
        id: 2,
        command: 'adios',
        timestamp: '2020-01-02T00:00:00.000Z',
        user: 'cemdev',
      },
      {
        id: 3,
        command: 'gordo',
        timestamp: '2020-01-03T00:00:00.000Z',
        user: 'cemdev',
      },
      {
        id: 4,
        command: 'devto',
        timestamp: '2020-01-03T00:00:00.000Z',
        user: 'cemdev',
      },
    ];
  }
}

export default HistoryService;
