import Image from "next/image";

// util
import { combineClassNames, combinePhotoUrl } from "@src/libs";

type Props = {
  photo?: string | null;
  className: string;
  alt?: string;
  priority?: boolean;
};

const Avatar = ({
  photo,
  className,
  alt = "프로필 이미지",
  priority,
}: Props) => {
  const src = photo
    ? photo.includes("http")
      ? photo
      : combinePhotoUrl(photo)
    : "/avatar.png";

  return (
    <figure className={combineClassNames("relative", className)}>
      <Image
        src={src}
        layout="fill"
        alt={alt}
        className="object-cover rounded-full"
        priority={priority}
      />
    </figure>
  );
};

export default Avatar;
