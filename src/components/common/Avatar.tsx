import Image from "next/image";

// util
import { combineClassNames } from "@src/libs/util";

type Props = {
  photo?: string;
  size: string;
  className?: string;
  alt?: string;
  $cover?: boolean;
  $rouneded?: boolean;
  $priority?: boolean;
};

const Avatar = ({
  photo,
  size,
  className,
  alt = "프로필 이미지",
  $cover,
  $rouneded,
  $priority,
}: Props) => {
  return (
    <>
      <figure
        className={combineClassNames(
          "relative",
          size,
          className ? className : ""
        )}
      >
        <Image
          src={photo ? photo : "/avatar.png"}
          layout="fill"
          alt={alt}
          className={combineClassNames(
            $cover ? "object-cover" : "object-contain",
            $rouneded ? "rounded-full" : ""
          )}
          priority={$priority}
        />
      </figure>
    </>
  );
};

export default Avatar;
