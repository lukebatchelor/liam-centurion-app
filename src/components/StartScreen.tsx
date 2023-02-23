type Props = {
  onReadyClick: () => void;
};
export default function StartScreen(props: Props) {
  return (
    <div className="flex flex-col items-center justify-evenly h-full">
      <h1 className="text-5xl pb-4">Centurion</h1>
      <div className="text-xl text-center">
        <p>The goal is simple</p>
        <p>100 shots of beer</p>
        <p>in 100 minutes</p>
      </div>
      <div className="text-3xl py-12">
        <p>Can you do it?</p>
      </div>
      <div>
        <button
          type="button"
          onClick={props.onReadyClick}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xl px-10 py-4 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          I'm Ready
        </button>
      </div>
    </div>
  );
}
