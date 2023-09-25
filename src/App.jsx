import { useDispatch, useSelector } from "react-redux";

import Timer from "./components/timer/Timer";
import "./App.css";
import Game1 from "./components/Game1/Game1";
import Modal from "./components/Modal/Modal";
import { gameDataAction } from "./components/store/gameData-slice";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gd);

  return (
    <>
      <div className="whole-page">
        <span className="header">A GAME OF MATHS</span>
        {/* <img src={bg6} /> */}
        {!gameData.closeModal && (
          <>
            <div className="modal-container"></div>
            <div className="modal">
              <Modal />
            </div>
            <div className="modal-close-box">
              <button
                className="modal-close"
                onClick={() => {
                  dispatch(gameDataAction.closeModalHandler());
                  dispatch(gameDataAction.restart());
                  return;
                }}
              >
                <span className="modal-close-x">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#e5dbff"
                    viewBox="0 0 24 24"
                    stroke-width="1.0"
                    stroke="#495057"
                    class="w-6 h-6"
                    height={"35px"}
                    width={"35px"}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </>
        )}
        <Timer />
        <Game1 />
      </div>
      <Footer />
    </>
  );
}

export default App;
