interface EditDialogProps {
  title: string;
  text: string;
}

const EditDialog = ({ title, text }: EditDialogProps) => {
  return (
    <div className="bg-slate-50 border rounded-md p-4 shadow-md absolute left-1/2 -translate-x-1/2 top-0 z-10 w-4/5 h-fit">
      <form className="flex flex-col gap-2">
        <div className="flex flex-col justify-center items-start">
          <label htmlFor="title" className="text-3xl font-semibold">
            Title
          </label>
          <input
            type="text"
            placeholder="Title..."
            id="title"
            value={title}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col justify-center items-start">
          <label htmlFor="text" className="text-lg font-semibold">
            Text
          </label>
          <textarea
            placeholder="Description..."
            id="text"
            required
            value={text}
            className="w-full p-2 border rounded h-32 resize-none"
            rows={4}
          />
        </div>
        <button className="w-fit px-4 py-2 text-right text-white bg-softBlue rounded-md hover:bg-softBlue/80 active:scale-105 duration-200">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditDialog;
