import { PropertyPipe } from './property.pipe';

describe('PropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new PropertyPipe();
    expect(pipe).toBeTruthy();
  });
});
