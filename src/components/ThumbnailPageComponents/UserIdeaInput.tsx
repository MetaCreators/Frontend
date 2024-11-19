import { Button } from "../ui/button";

function UserIdeaInput() {
  return (
    <div className="space-y-6 ">
      <div>Make Your Content Click-Worthy!</div>
      <div className="flex justify-center items-center space-x-6">
        <input
          placeholder="Type in your idea here"
          className="border rounded-xl p-3 h-10 w-3/4  border-slate-400"
        />
        <Button>Generate</Button>
      </div>
    </div>
  );
}

export default UserIdeaInput;
