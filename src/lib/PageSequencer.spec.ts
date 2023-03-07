import { expect, describe, test } from 'vitest';
import PageSequencer from './PageSequencer';

describe('PageSequencer', () => {
  test('single page document', () => {
    const subject = new PageSequencer(1);
    expect(subject.sideA).toEqual({
      pages: [1],
      appendBlankPage: false,
    });
    expect(subject.sideB).toEqual({
      pages: [],
      appendBlankPage: true,
    });
  });

  test('two page document', () => {
    const subject = new PageSequencer(2);
    expect(subject.sideA).toEqual({
      pages: [1],
      appendBlankPage: false,
    });
    expect(subject.sideB).toEqual({
      pages: [2],
      appendBlankPage: false,
    });
  });

  test('multi page document - even number of pages', () => {
    const subject = new PageSequencer(16);
    expect(subject.sideA).toEqual({
      pages: [1, 3, 5, 7, 9, 11, 13, 15],
      appendBlankPage: false,
    });
    expect(subject.sideB).toEqual({
      pages: [16, 14, 12, 10, 8, 6, 4, 2],
      appendBlankPage: false,
    });
  });

  test('multi page document - odd number of pages', () => {
    const subject = new PageSequencer(17);
    expect(subject.sideA).toEqual({
      pages: [1, 3, 5, 7, 9, 11, 13, 15, 17],
      appendBlankPage: false,
    });
    expect(subject.sideB).toEqual({
      pages: [16, 14, 12, 10, 8, 6, 4, 2],
      appendBlankPage: true,
    });
  });
});
