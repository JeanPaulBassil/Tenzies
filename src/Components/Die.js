export default function Die({handleClick, index, value, isHeld}){
    return (
        <div onClick={() => handleClick(index)} className={`die ${isHeld ? "held":"not-held"}`}>
            <p>{value}</p>
        </div>
    )
}