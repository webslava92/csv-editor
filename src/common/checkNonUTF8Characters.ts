import * as iconv from 'iconv-lite';

export function checkNonUTF8Characters(str: string): boolean {
  const buffer = Buffer.from(str, 'binary');
  const decoded = iconv.decode(buffer, 'utf8');
  return (
    Buffer.byteLength(decoded, 'utf8') !== Buffer.byteLength(str, 'binary')
  );
}

export function checkNonAsciiCharacters(item: any): boolean {
  const nonAsciiValues = Object.values(item).some((str: any) =>
    checkNonUTF8Characters(str)
  );
  return nonAsciiValues;
}
