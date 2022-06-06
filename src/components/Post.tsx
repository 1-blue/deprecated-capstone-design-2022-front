import Link from "next/link";

// type
import { ICON } from "@src/types";
import type { IPostWithUserAndCount } from "@src/types";

// util
import { timeFormat } from "@src/libs/dateFormat";

// common-component
import Icon from "@src/components/common/Icon";
import Photo from "@src/components/common/Photo";
import Avatar from "@src/components/common/Avatar";

type Props = {
  post: IPostWithUserAndCount;
  photoSize: string;
  $priority?: boolean;
};

const Post = ({ post, photoSize, $priority }: Props) => {
  return (
    <li className="group bg-zinc-300 dark:bg-zinc-700 rounded-md overflow-hidden hover:-translate-y-2 duration-500 min-w-[300px] mb-8">
      {/* 게시글 섬네일 */}
      <Link href={`/${post.user.name}/${post.title}`}>
        <a>
          <Photo
            photo={post.thumbnail}
            size={photoSize}
            alt="임시 게시글 이미지"
            $scale
            $cover
            $priority={$priority}
          />
        </a>
      </Link>

      <section className="flex flex-col py-4">
        {/* 게시글 제목과 내용 */}
        <Link href={`/${post.user.name}/${post.title}`}>
          <a>
            <h3 className="text-lg font-bold px-4 mb-1">{post.title}</h3>
            <p className="whitespace-pre text-sm px-4 mb-4">{post.summary}</p>
          </a>
        </Link>
        {/* 게시글 작성 시간 */}
        <time className="text-xs text-gray-400 px-4 mb-2">
          {timeFormat(post.updatedAt)}
        </time>
        <div className="border border-gray-200 dark:border-gray-600 mb-4" />
        {/* 작성자 정보와 좋아요, 댓글 개수 */}
        <div className="flex items-center px-4">
          <Link href={`/${post.user.name}`}>
            <a className="flex space-x-2 items-center">
              <Avatar
                photo={post.user.avatar}
                size="w-6 h-6"
                alt="유저 이미지"
                $rouneded
              />
              <span className="hover:underline underline-offset-4 text-sm">
                {post.user.name}
              </span>
            </a>
          </Link>
          <div className="flex-1" />
          <div className="flex space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <Icon icon={ICON.COMMENTS} className="w-5 h-5" />
              <span>{post._count.comment}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon icon={ICON.HEART} className="w-5 h-5" />
              <span>{post._count.favorite}</span>
            </div>
          </div>
        </div>
      </section>
    </li>
  );
};

export default Post;
