import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  return (
    <>
      <h1>유저 프로필 페이지 - {router.query.name}</h1>
    </>
  );
};

export default Profile;
