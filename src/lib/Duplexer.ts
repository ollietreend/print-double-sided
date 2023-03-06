import { PDFDocument } from "pdf-lib";
import PageSequencer from "./PageSequencer";
import type { Sequence } from "./PageSequencer";

export default class Duplexer {
  input: PDFDocument;

  static async load(inputFile) {
    const pdf = await PDFDocument.load(inputFile);
    return new Duplexer(pdf);
  }

  constructor(input: PDFDocument) {
    this.input = input;
  }

  get sideA() {
    return this.createSide(this.pageSequence.sideA);
  }

  get sideB() {
    return this.createSide(this.pageSequence.sideB);
  }

  private async createSide(side: Sequence) {
    const output = await PDFDocument.create();

    const pageIndices = side.pages.map((p) => (p - 1));
    const pages = await output.copyPages(this.input, pageIndices);
    pages.forEach((page) => { output.addPage(page) });

    if (side.appendBlankPage) {
      output.addPage();
    }

    return output.save();
  }

  private get pageSequence() {
    const pageCount = this.input.getPageCount();
    return new PageSequencer(pageCount);
  }
}
