import { expect, describe, it } from 'vitest';
import { readFile, writeFile } from 'node:fs/promises';
import Duplexer from './Duplexer';

const fixture = (filename: string) => {
  return readFile(`test/fixtures/${filename}`);
};

describe('Duplexer', () => {
  it('duplexes a single page document', async () => {
    const file = await fixture('single_page.pdf');
    const duplex = await Duplexer.load(file);

    await writeFile('test/fixtures/single_page_sideA.pdf', await duplex.sideA);
    await writeFile('test/fixtures/single_page_sideB.pdf', await duplex.sideB);
  });
});
