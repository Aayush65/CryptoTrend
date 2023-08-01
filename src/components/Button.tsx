
const Button = (props: { name: string; handleClick: () => void }) => {
  return (
    <button onClick={props.handleClick} className="py-3 px-5 tracking-wider text-text-secondary bg-primary rounded-lg">
        {props.name}
    </button>
  )
}

export default Button
