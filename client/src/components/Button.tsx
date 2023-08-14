
const Button = (props: { name: string; handleClick: () => void; css: string }) => {
  return (
    <button onClick={props.handleClick} className={`${props.css || ""} py-2 px-3 md:py-3 md:px-5 md:tracking-wider bg-primary rounded-lg hover:scale-105 hover:cursor-pointer flex justify-center items-center`}>
        {props.name}
    </button>
  )
}

export default Button
