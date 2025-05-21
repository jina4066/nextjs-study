import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  //비동기 결과를 의미하는 promise 객체 제네릭
  let url = `http://localhost:12345/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json(); //응답값을 json포맷으로 변환해서 반환
  } catch (err) {
    console.error(err);
    return [];
  }
}
