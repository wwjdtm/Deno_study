let file = await Deno.open('hello.txt');

// file을 표준출력으로 보여줌
await Deno.copy(file, Deno.stdout);

file.close;
