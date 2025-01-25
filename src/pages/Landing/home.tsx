function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="w-full flex justify-center items-center">
        <div className="border w-1/2 border-black rounded-xl mt-2 flex justify-between px-2 py-1 items-center">
          <div>logo</div>
          <div className="flex space-x-3">
            <div>feature</div>
            <div>about us</div>
          </div>
          <div className="border border-black p-1 px-2 rounded-sm">
            book a call
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
