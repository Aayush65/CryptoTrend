

const LoadingSpinner = () => {

    return (
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-text-primary" role="status"></div>
    )
}

export default LoadingSpinner;