export type Sequence = {
  pages: number[],
  appendBlankPage: boolean,
};

export default class PageSequencer {
  readonly pageCount: number;

  constructor(pageCount: number) {
    this.pageCount = pageCount;
  }

  get sideA(): Sequence {
    return {
      pages: this.oddPages,
      appendBlankPage: false,
    };
  }

  get sideB(): Sequence {
    return {
      pages: this.evenPages,
      appendBlankPage: (this.evenPages.length < this.oddPages.length),
    };
  }

  private get allPages() {
    return Array.from({ length: this.pageCount }, (_, i) => (i + 1));
  }

  private get oddPages() {
    return this.allPages.filter(x => x % 2 === 1);
  }

  private get evenPages() {
    return this.allPages.filter(x => x % 2 === 0);
  }
}
