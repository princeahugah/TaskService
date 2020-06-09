let id = 0;

export default class LogIdGenerator {
  static getId(): number {
    id += 1;
    return id;
  }
}
