import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import { InferGetStaticPropsType } from "next";

// getStaticProps -> SSG
// getServerSideProps -> SSR

//컴포넌트보다 먼저 실행이 되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
export const getStaticProps = async () => {
  console.log("인덱스페이지");
  // 병렬로 api request가 동시에 발송 -> 더 빠르게 페이지 렌더링
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]); //인수로 전달한 배열 안애 들어있는 모든 비동기 함수들을 동시에 실행시켜주는 메서드

  // allBooks -> recoBooks 직렬 실행 순서
  //   const allBooks = await fetchBooks();
  //   const recoBooks = await fetchRandomBooks();

  return {
    props: { allBooks, recoBooks },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
