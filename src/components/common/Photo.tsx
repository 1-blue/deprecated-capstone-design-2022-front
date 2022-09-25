import Image from "next/image";

// util
import { combineClassNames, combinePhotoUrl } from "@src/libs";

type Props = {
  photo?: string | null;
  className: string;
  alt?: string;
  $scale?: boolean;
  $cover?: boolean;
  $rouneded?: boolean;
  priority?: boolean;
};

const Photo = ({
  photo,
  className,
  alt = "이미지",
  $scale,
  $cover,
  $rouneded,
  priority,
}: Props) => {
  return (
    <>
      <figure className={combineClassNames("relative", className)}>
        <Image
          src={photo ? combinePhotoUrl(photo) : "/temporary.jpg"}
          layout="fill"
          alt={alt}
          className={combineClassNames(
            $scale ? "group-hover:scale-110 duration-500" : "",
            $cover ? "object-cover" : "object-contain",
            $rouneded ? "rounded-full" : "",
            photo ? "" : "blur"
          )}
          priority={priority}
        />
      </figure>
    </>
  );
};

export default Photo;
