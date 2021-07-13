import { serve } from 'https://deno.land/std@0.100.0/http/server.ts';
const s = serve({ port: 5000 });
console.log('http://localhost:5000');

// 리퀘스트를 잡아와서 리스폰스 보냄
for await (const req of s) {
  req.respond({ body: 'hello im hussey' });
}
