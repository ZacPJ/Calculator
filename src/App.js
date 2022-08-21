import './App.css';
import { useState } from 'react';
import { evaluate } from "mathjs";

function App() {

	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("")
  const operators = ['/', '*', '+', '-', '.'];

	const updateCalc = (value) => {
    var calcArray = Array.from(calc)
    var filtered = calcArray.filter(i => operators.includes(i))
    if(value === "."){
      filtered.push(".")
      if(filtered[filtered.length-1] === filtered[filtered.length-2]){
        value = ""
        return;
      }
    }
  else if (
			(operators.includes(value) && calc === '') ||
			(operators.includes(value) && operators.includes(calc.slice(-1)))
     ) {
			return;
		}

		setCalc(calc + value);

		if (!operators.includes(value)) {
			setResult(evaluate(calc + value).toString());
		}
	}
  



	function deleteLast (){
		if (calc === '') {
			return;
		}
		const value = calc.slice(0, -1);
		
		setCalc(value);
	}
  function deleteAll(){
    setCalc("")
    setResult("")
  }

	function calculate (){
		setCalc(evaluate(calc).toString());
	}

	return (
		<div className="App">
			<h1>Simple Calculator</h1>
			<div className="calculator">
				<div className="display">
					{ result ? <span>({result})</span> : ''}&nbsp;
					{ calc || "0"}
				</div>

				

				<div className="digits">
					<CreateDigits updateCalc={updateCalc}/>
					<button onClick={calculate}>=</button>
				</div>

        <div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>
          </div>

          <div className = "AcDel">
            <button onClick={deleteLast}>DEL</button>
            <button onClick={deleteAll}>AC</button>
          </div>
			</div>
		</div>
	);
}

const CreateDigits = (keys) =>{


	const nums = ["1","2","3","4","5","6","7","8","9","0","."]

	return(
		<>
			{nums.map((num, index) => {
			return <button key={index} onClick={() => keys.updateCalc(num)}>{num}</button>
			})}
		</>
	)

	}

export default App;

