
export async function get (this: any, req: any, reply: any) {
  return this.homeService.get();
};