import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSettings } from "./Redux/Action";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const dispatch = useDispatch();
  const [rankApi, setRankApi] = useState([]);
  useEffect(() => {
    fetch("https://mocki.io/v1/a00d524f-a0b8-4460-b6a2-c27e59dc64f9")
      .then((repo) => repo.json())
      .then((data) => setRankApi(data));
  }, []);

  const [showRankToggle, setShowRankToggle] = useState(true);

  function ShowRank() {
    if (showRankToggle) {
      return (
        <div>
          <table className="tableRank" cellSpacing="6">
            <caption
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginLeft: "10px",
              }}
            >
              Focus Time This Week
            </caption>
            <thead>
              <tr>
                <th className="thRank">Place</th>
                <th className="thRank">Profile</th>
                <th className="thRank">User</th>
                <th className="thRank">(HH:MM)</th>
              </tr>
            </thead>
            <tbody>
              {rankApi.map((item, index) => (
                <tr key={item.id} className="trRank">
                  <td className="tdRank">{++index}</td>
                  <td className="tdRankImg">
                    <img
                      src="./MediaSrc/user.png"
                      style={{ width: "30px", borderRadius: "50%" }}
                    />
                  </td>
                  <td className="tdRank">{item.user}</td>
                  <td className="tdRank">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  const settings = useSelector((state) => state.settings);
  // console.log(settings)
  const [pomodoro, setPomodoro] = useState(settings.pomodoro);
  const [shortBreak, setShortBreak] = useState(settings.shortBreak);
  const [longBreak, setLongBreak] = useState(settings.longBreak);
  const [autoStartPomodoro, setAutoStartPomodoro] = useState(false);
  const [autoStartShortBreak, setAutoStartShortBreak] = useState(false);

  function handleSettings(e) {
    e.preventDefault();
    const newSettings = {
      pomodoro: +pomodoro,
      shortBreak: +shortBreak,
      longBreak: +longBreak,
      autoStartPomodoro: autoStartPomodoro,
      autoStartShortBreak: autoStartShortBreak,
    };
    dispatch(UpdateSettings(newSettings));
    closeModal();
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenRanking, setIsModalOpenRanking] = useState(false);

  const openModalRanking = () => {
    setIsModalOpenRanking(true);
  };

  const closeModalRanking = () => {
    setIsModalOpenRanking(false);
  };
  return (
    <Fragment>
      <div className="parentHeader">
        <div className="header">
          <Link to="/">
            <img src="./logoBg.png" className="BrandLogo" />
          </Link>
          <ul className="listLinks">
            <li>
              <Link to="/">
                <button className="Link" onClick={openModalRanking}>
                  <i class="bx bxs-report"></i> Rank
                </button>
              </Link>
            </li>
            <li>
              <Link to="/">
                <button className="Link" onClick={openModal}>
                  <i class="bx bxs-cog"></i> Setting
                </button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className="Link">
                  <i class="bx bx-user"></i> Login
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        id="Modal"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <div className="DivOFModal">
          <div className="headerModal">
            <button onClick={closeModal} className="backToHome">
              <i class="bx bx-x-circle"></i>
            </button>
            <h2>Setting</h2>
          </div>
          <h3>
            <i class="bx bx-time"></i> Timer
          </h3>
          <h5>Time (minutes) </h5>
          <form onSubmit={handleSettings}>
            <table className="tableSettings">
              <tr>
                <td style={{ width: "47%" }} colSpan="3">
                  <div
                    style={{
                      borderBottom: "3px solid red",
                      fontWeight: "bold",
                      borderRadius: "5px",
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>
                  Pomodoro : <br />
                  <input
                    type="number"
                    className="inputesSettings"
                    onChange={(e) => setPomodoro(e.target.value)}
                    value={pomodoro}
                  />
                </td>
                <td>
                  Short Break : <br />
                  <input
                    type="number"
                    className="inputesSettings"
                    onChange={(e) => setShortBreak(e.target.value)}
                    value={shortBreak}
                  />
                </td>
                <td>
                  Long Break : <br />
                  <input
                    type="number"
                    className="inputesSettings"
                    onChange={(e) => setLongBreak(e.target.value)}
                    value={longBreak}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">Auto Start Breaks</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkBoxTask"
                    onChange={(e) =>
                      setAutoStartShortBreak(!autoStartShortBreak)
                    }
                    checked={autoStartShortBreak ? true : false}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">Auto Start Pomodoros</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkBoxTask"
                    onChange={(e) => setAutoStartPomodoro(!autoStartPomodoro)}
                    checked={autoStartPomodoro ? true : false}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">Long Break Interval</td>
                <td>
                  <input type="number" className="inputesSettings" />
                </td>
              </tr>
              <tr>
                <td style={{ width: "47%" }} colSpan="3">
                  <div
                    style={{
                      borderBottom: "3px solid red",
                      fontWeight: "bold",
                      borderRadius: "5px",
                    }}
                  ></div>
                </td>
              </tr>
              <h3>
                <i class="bx bxs-magic-wand"></i> Theme
              </h3>
              <tr>
                <td colSpan="2">Color Theme</td>
                <td>
                  <input type="checkbox" className="checkBoxTask" />
                  <input type="checkbox" className="checkBoxTask" />
                </td>
              </tr>
              <tr>
                <td colSpan="2">Alarm</td>
                <td>
                  <input
                    type="file"
                    className="inputesSettings"
                    style={{ display: "none" }}
                  />
                  <input
                    type="button"
                    className="inputesSettingsFile"
                    value="+Choose File"
                  />
                </td>
              </tr>
              <tr>
                <td style={{ width: "47%" }} colSpan="3">
                  <div
                    style={{
                      borderBottom: "3px solid red",
                      fontWeight: "bold",
                      borderRadius: "5px",
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td colSpan="3" className="tdOfOk">
                  <input type="submit" value="OK" className="btnOk" />
                </td>
              </tr>
            </table>
          </form>
        </div>
      </Modal>
      <Modal
        id="Modal"
        isOpen={isModalOpenRanking}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <div className="ModalReport">
          <button onClick={closeModalRanking} className="backToHome">
            <i class="bx bx-x-circle"></i>
          </button>{" "}
          <br />
          <button className="btnHeaderModalReport">Ranking</button>
          {ShowRank()}
        </div>
      </Modal>
    </Fragment>
  );
}
