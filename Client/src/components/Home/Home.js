import useFetch from './components/useFetch'
const Home = () => {
    const { error, isPending, data: User } = useFetch('')
    return (
        <div className="home">
            { error && <div>{error}</div>}
            { isPending && <div>Loading...</div>}
        </div>
    );
}

export default Home;