import Image from "next/image";

// util
import { combineClassNames } from "@src/libs/util";

type Props = {
  photo?: string | null;
  size: string;
  className?: string;
  alt?: string;
  $scale?: boolean;
  $cover?: boolean;
  $rouneded?: boolean;
  $priority?: boolean;
};

const Photo = ({
  photo,
  size,
  className,
  alt = "이미지",
  $scale,
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
          src={photo ? photo : "/temporary.jpg"}
          layout="fill"
          alt={alt}
          className={combineClassNames(
            $scale ? "group-hover:scale-110 duration-500" : "",
            $cover ? "object-cover" : "object-contain",
            $rouneded ? "rounded-full" : "",
            photo ? "" : "blur"
          )}
          priority={$priority}
        />
      </figure>
    </>
  );
};

export default Photo;
