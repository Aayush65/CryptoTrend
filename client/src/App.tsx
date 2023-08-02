import { useContext } from "react"
import { AppPage, Navbar, WatchList } from "./components"
import { context } from "./context"

function App() {
	const { isWatchListVisible } = useContext(context);

	return (
		<div className={`max-w-screen min-h-screen bg-background text-text-primary ${isWatchListVisible  ? "max-h-screen overflow-hidden" : ""}`}>
			<Navbar />
			<AppPage />
			{isWatchListVisible ? <WatchList /> : null}
		</div>
	)
}

export default App
