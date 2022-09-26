type Props = {
  text: string;
};

const Info = ({ text }: Props) => {
  return (
    <span className="inline-block w-full my-4 text-center sm:text-xl font-bold text-black dark:text-white">
      ** {text} **
    </span>
  );
};

export default Info;
