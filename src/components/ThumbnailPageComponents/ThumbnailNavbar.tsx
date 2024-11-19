function ThumbnailNavbar() {
  return (
    <div className="flex justify-between items-center px-10 py-4 sticky top-0 bg-white border border-b">
      <div>Thumbnail</div>
      <div className="flex items-center space-x-3">
        <div>About</div>
        <div>Contact</div>
      </div>
    </div>
  );
}

export default ThumbnailNavbar;
