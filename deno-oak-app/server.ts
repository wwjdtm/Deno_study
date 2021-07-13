// 애플리케이션 사용
import { Application, Router } from 'https://deno.land/x/oak@v7.7.0/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

const app = new Application();

// 아무런 리퀘스트나 라우터가 없으면 에러뜸
const router = new Router();

// 미들웨어 등록
app.use(router.routes());
app.use(router.allowedMethods());

// 타입스크립트이기 때문에 아래의 book 객체 타입 명시
interface Book {
  id: string;
  title: string;
  author: string;
}

let books: Book[] = [
  {
    id: '1',
    title: 'book one',
    author: 'one',
  },
  {
    id: '2',
    title: 'book two',
    author: 'two',
  },
  {
    id: '3',
    title: 'book three',
    author: 'three',
  },
];

// 루트 엔드포인트에 가면 text 를 response 해줌
// deno 는 context 안에 리스폰스, 리퀘스트 다 들어있음 {Response, requese}
router
  .get('/', (context) => {
    context.response.body = 'hello my name is hussey';
  })

  .get('/books', (context) => {
    context.response.body = books;
  })

  // post 는 항상 promise 로 리턴하기 때문에 await 적어줘야함->top레벨에서는 그냥 적어도 에러안남
  // 여기서는 async로 감싸줘야함

  .post('/book', async (context) => {
    // 입력받은 값은 body로 들어감(title, author)
    let bbody = await context.request.body();

    //만약 값을 넣지 않았다면
    if (!context.request.hasBody) {
      context.response.status = 400;
      context.response.body = 'no data';
    } else {
      const book: Book = await bbody.value;
      // 아이디를 유효아이디로 지정해줌
      book.id = v4.generate();

      books.push(book);
      context.response.status = 201;
      context.response.body = book;
    }
  })

  .get('/books/:id', async (context) => {
    // books 안에 있는 책들 중에 param의 값과 같은 id 를 가진 책 찾기
    // 못찾으면 undefined로 정의 내리기
    const book: Book | undefined = books.find(
      (b) => b.id === context.params.id
    );

    if (book) {
      context.response.body = book;
      context.response.status = 200;
    } else {
      context.response.body = "Can't find the book";
      context.response.status = 404;
    }
  });

console.log('Server is listening on port 5000');
// 항상 primse로 리턴을 하기때문에 await을 적어줘야함
await app.listen({ port: 5000 });
