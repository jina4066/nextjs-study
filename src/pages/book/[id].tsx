import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

export const getStaticPaths = () => {
  return {
    paths: [
      // url 파라미터 값은 반드시 문자열로 명시를 해야 next가 읽어올 수 있다
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    //만약 브라우저에서 path값으로 설정하지 않은 경로로 접속 요청을 할 때의 대비책
    fallback: false, //404
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; //! 타입을 사용해 undefined이 아닐 것이라고 단언(파라미터가 없다면 들어올 수 없는 url)
  const book = await fetchOneBook(Number(id)); // url 파라미터로써 불러온 id는 기본적으로 스트링 타입 -> Number로 타입 변환 필요

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) return "문제가 발생했습니다. 다시 시도해주세요";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <img src={coverImgUrl} />
      </div>

      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
