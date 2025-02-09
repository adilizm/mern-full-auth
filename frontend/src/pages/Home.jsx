import Header from "../components/Header";
import { store } from "../redux/store";
function Home() {
  return (
    <>
      <Header />
      Home page -{store.getState().users.token}
    </>
  );
}

export default Home;
