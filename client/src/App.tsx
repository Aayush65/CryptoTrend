import { useContext } from "react"
import { AppPage, Navbar, WatchList } from "./components"
import { context } from "./context"

function App() {
	const { isWatchListVisible } = useContext(context);

	return (
		<div className={`select-none max-w-screen min-h-screen bg-background text-text-primary ${isWatchListVisible  ? "max-h-screen overflow-hidden" : ""}`}>
			<div className="md:hidden fixed inset-0 bg-primary text-text-primary p-4 text-2xl z-10 flex h-screen w-screen justify-center items-center text-center">
				Please visit this website on a bigger screen
			</div>
			<Navbar />
			<AppPage />
			{isWatchListVisible ? <WatchList /> : null}
		</div>
	)
}

export default App
