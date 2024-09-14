// import axios from "axios";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import "./App.css";
// import { data } from "autoprefixer";

const socket = io("http://localhost:3000");

function Getques() {
  const [category, setCategory] = useState("Loading Category");
  const [ques, setQues] = useState("Loading Ques...");
  const [option, setOption] = useState([]); // Initialize as an array
  const [correctIndex, setCorrectIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [otherPersonSelected, setOtherPersonSelected] = useState(null);

  useEffect(() => {
    async function getQues() {
      try {
        // const response = await axios.get(
        //   "https://opentdb.com/api.php?amount=1"
        // );
        // console.log(response);

        // setCategory(response.data.results[0].category);
        // setQues(response.data.results[0].question);

        // const correctAnswer = response.data.results[0].correct_answer;
        // let options = [
        //   correctAnswer,
        //   ...response.data.results[0].incorrect_answers,
        // ];

        // let shuffledOptions = shuffle(options);
        // let correctAnswerIndex = shuffledOptions.indexOf(correctAnswer);

        // setOption(shuffledOptions);
        // setCorrectIndex(correctAnswerIndex);
        // setSelectedOption(null); // Reset selected option for each new question

        socket.on('apiRes', (data)=>{
          // console.log('in apiRes');
          
          setCategory(data.category)
          setQues(data.ques)
          let options = [data.correct_answer, ...data.incorrect_answer]
          let shuffledOptions = shuffle(options)
          let correctAnswerIndex = shuffledOptions.indexOf(data.correct_answer)
          
          setOption(shuffledOptions)
          setCorrectIndex(correctAnswerIndex);
          // console.log(option);
        })

        // socket.on("other-player-selected", (data) => {
        //   setOtherPersonSelected(data.selectedOption);
        // });
      } catch (err) {
        console.log("Could not fetch because of error:", err);
      }
    }
    getQues();
  }, []);

  // Fisher-Yates algorithm for shuffling
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleButtonClick(index) {
    setSelectedOption(index); // Track the selected option

    // socket.emit("option-selected", { selectedOption: index });
  }

  return (
    <div>
      <p className="my-[5px] text-green-500 ">Category: {category}</p>
      <div id="ques" className="text-green my-[5px]">
        <h1>{ques}</h1>
      </div>
      <div
        id="opts"
        className="justify-around my-4 border rounded-lg text-[16px] max-w-[400px] p-[17px]"
      >
        {option.map((eachOption, index) => {
          // Determine the button color
          let buttonColor = "";
          if (selectedOption !== null) {
            if (index === correctIndex && index === selectedOption) {
              buttonColor = "bg-green-500 text-white"; // Correct answer selected
            } else if (index === selectedOption && index !== correctIndex) {
              buttonColor = "bg-red-500 text-white"; // Wrong answer selected
            } else if (index === correctIndex) {
              buttonColor = "bg-green-500 text-white"; // Correct answer when wrong answer is selected
            }
          }
          if (otherPersonSelected !== null)
            if (index === otherPersonSelected)
              buttonColor = "bg-yellow-500 text-white";

          return (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`border p-[7px] rounded-lg m-[5px] ${buttonColor}`}
              disabled={selectedOption !== null} // Disable buttons after one is clicked
            >
              {eachOption}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Getques;

// import axios from "axios";

// async function importQues() {
//   return ;
// }

// export default importQues;
