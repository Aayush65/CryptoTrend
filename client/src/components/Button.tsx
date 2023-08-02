
const Button = (props: { name: string; handleClick: () => void; css: string }) => {
  return (
    <button onClick={props.handleClick} className={`${props.css || ""} py-3 px-5 tracking-wider bg-primary rounded-lg hover:scale-105 hover:cursor-pointer flex justify-center items-center`}>
        {props.name}
    </button>
  )
}

export default Button
