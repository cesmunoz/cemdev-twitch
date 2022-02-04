export class HelloWorldController {
  public repository: any;
  constructor(opts: { helloWorldRepository: any }) {
    this.repository = opts.helloWorldRepository;
  }

  public get(request: any, reply: any) {
    const result = this.repository.get();
    reply.send({
      message: result
    });
  }
}
