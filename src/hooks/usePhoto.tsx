import { useCallback } from "react";
import { toast } from "react-toastify";

// api
import apiService from "@src/api";

// type
import type { DragEvent, ChangeEvent } from "react";
import type { PhotoKinds } from "@src/types";
import { AxiosError } from "axios";

type ReturnT = [
  (e: ChangeEvent<HTMLInputElement>) => Promise<string | false>,
  (e: DragEvent<HTMLElement>) => Promise<string | false>
];

type Props = {
  kinds: PhotoKinds;
};

// 2022/09/25 - 이미지 업로드하는 함수를 반환하는 훅 - by 1-blue
const usePhoto = ({ kinds }: Props): ReturnT => {
  // "클릭"으로 이미지 업로드
  const onUploadPhotoByClick = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (!e.target.files) return false;
      if (e.target.files?.length === 0) return false;

      const file = e.target.files[0];

      try {
        const { photoURL } = await apiService.photoService.apiCreatePhoto({
          file,
          kinds,
        });

        // 알 수 없는 이유로 이미지 업로드 실패
        if (!photoURL) {
          toast.warning("이미지를 업로드하지 못했습니다.");
          return false;
        }

        toast.success("이미지를 업로드했습니다.");

        return photoURL;
      } catch (error) {
        console.error("error >> ", error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("알 수 없는 에러가 발생했습니다.");
        }

        return false;
      }
    },
    [kinds]
  );

  // "드래그 & 드랍"으로 이미지 업로드
  const onUploadPhotoByDrop = useCallback(
    async (e: DragEvent<HTMLElement>) => {
      e.preventDefault();

      if (!e.dataTransfer.files) return false;
      if (e.dataTransfer.files?.length === 0) return false;

      const file = e.dataTransfer.files[0];

      try {
        const { photoURL } = await apiService.photoService.apiCreatePhoto({
          file,
          kinds,
        });

        // 알 수 없는 이유로 이미지 업로드 실패
        if (!photoURL) {
          toast.warning("이미지를 업로드하지 못했습니다.");
          return false;
        }

        toast.success("이미지를 업로드했습니다.");

        return photoURL;
      } catch (error) {
        console.error("error >> ", error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("알 수 없는 에러가 발생했습니다.");
        }

        return false;
      }
    },
    [kinds]
  );

  return [onUploadPhotoByClick, onUploadPhotoByDrop];
};

export default usePhoto;
