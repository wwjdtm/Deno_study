const encoder = new TextEncoder();

const helloText = encoder.encode('hello, im hussey');

Deno.writeFile('hello.txt', helloText);

// callback 이 아니라 promise 로 출력
// 원래는
// async () => {
//   await Deno.writeFile("hello.txt", helloText);

// } 이지만 await 이 지원됨.

await Deno.writeFile('hello.txt', helloText);

// 실행 play-deno >>  deno run --allow-write createFile.ts
