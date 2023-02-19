import React from "react";
import Die from "./Components/Die";
import Confetti from "react-confetti";

export default function App(){
 
    
    const [tenzies, setTenzies] = React.useState(false);
    
    
    const [values, setValues] = React.useState(Array.apply(null, Array(10)).map( _ => ({
        number: Math.ceil(Math.random() * 6),
        isHeld: false
    })));
    const dies = values.map( (value, index) => <Die key={index} handleClick={sethold} index={index} value={value.number} isHeld={value.isHeld}/>)

    React.useEffect( _ => {
        let allHeld = true;
        let value = values[0].number;
        let equalVals = true;
        values.forEach(element => {
            {!element.isHeld && (allHeld = false)};
            {element.number != value && (equalVals = false)}   
        });
        setTenzies(allHeld && equalVals);
    }, values)
    
    function roll(){
        setValues(values => {
            return values.map( value => ({
                ...value,
                number: value.isHeld ? value.number : Math.ceil(Math.random() * 6)
            }))
        });
    }

    function newGame(){
        setValues(values => {
            return values.map( value => ({
                ...value,
                number: Math.ceil(Math.random() * 6),
                isHeld: false
            }))
        });
        setTenzies(false)
    }

    React.useEffect(() => {
        if (tenzies) {
            console.log("You Win!");
        }
    }, [tenzies]);

    function sethold(index){
        setValues(values => {
            const updatedValues = values.map((value, i) => {
                if (i === index) {
                    return {
                        ...value,
                        isHeld: !value.isHeld
                    };
                }
                return value;
            });
            return updatedValues;
        })
    }


    return (
        <div className="app">
            {tenzies && <Confetti/>}
            <h1>Tenzies</h1>
            <p className="text ">Roll untill all dice are the same. Click <br/> each die to freeze it at it's current value <br/> between rolls.</p>
            <div className="dies">
                {dies}
            </div>
            <button className="btn" onClick={tenzies ? newGame : roll}>{tenzies? "New Game" : "Roll"}</button>
        </div>
    )
}