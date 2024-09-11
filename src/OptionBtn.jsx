import "./App.css";

function Btns() {

  const handleRefreshBtn = () => {
    location.reload()
    // return window.open("https://google.com", "Example", "width=300,height=400");
    
  };

  return (
    <>
      <div>
        <button
          className="text-[16px]  border rounded-lg p-1"
          onClick={handleRefreshBtn}
        >
          Next
        </button>
      </div>
    </>
  );
}
export default Btns;
