import '../css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

import NavigationBar from './NavigationBar';
import MeetingProgressBar from './MeetingProgressBar';
import MeetingPhaseDetails from './MeetingPhaseDetails';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <h1 className="mb-5">Coca Cola Product Meeting</h1>
      <MeetingProgressBar/>
      <MeetingPhaseDetails/>
    </div>
  );
}

export default App;
