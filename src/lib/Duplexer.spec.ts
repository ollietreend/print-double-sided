import { expect, describe, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import Duplexer from './Duplexer';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const fixture = (filename: string) => {
  return readFile(`test/fixtures/${filename}`);
};

describe('Duplexer', () => {
  it('duplexes a single page document', async () => {
    const file = await fixture('single_page.pdf');
    const duplex = await Duplexer.load(file);

    const sideA = await pdfParse(await duplex.sideA);
    expect(sideA.numpages).toEqual(1);
    expect(sideA.text.trim()).toEqual("Example document\nThis is an example document.");

    const sideB = await pdfParse(await duplex.sideB);
    expect(sideB.numpages).toEqual(1);
    expect(sideB.text.trim()).toEqual("");
  });

  it('duplexes a five page document', async () => {
    const file = await fixture('five_page.pdf');
    const duplex = await Duplexer.load(file);

    const sideA = await pdfParse(await duplex.sideA);
    expect(sideA.numpages).toEqual(3);
    expect(sideA.text.trim().split("\n\n")).toEqual([
      "Page one",
      "Page three",
      "Page five",
    ]);

    const sideB = await pdfParse(await duplex.sideB);
    expect(sideB.numpages).toEqual(3);
    expect(sideB.text.trim().split("\n\n")).toEqual([
      "Page two",
      "Page four",
      // blank page
    ]);
  });

  it('duplexes a ten page document', async () => {
    const file = await fixture('ten_page.pdf');
    const duplex = await Duplexer.load(file);

    const sideA = await pdfParse(await duplex.sideA);
    expect(sideA.numpages).toEqual(5);
    expect(sideA.text.trim().split("\n\n")).toEqual([
      "Page one",
      "Page three",
      "Page five",
      "Page seven",
      "Page nine",
    ]);

    const sideB = await pdfParse(await duplex.sideB);
    expect(sideB.numpages).toEqual(5);
    expect(sideB.text.trim().split("\n\n")).toEqual([
      "Page two",
      "Page four",
      "Page six",
      "Page eight",
      "Page ten",
    ]);
  });
});
