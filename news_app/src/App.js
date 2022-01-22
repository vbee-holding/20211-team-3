import Header from './components/Header/Header';
import './css/base.css'
import './css/news.css'
import './css/footer.css'
import './css/sidebar.css'
import './css/vietnam_new.css'
import './css/what_people_are_reading.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div>
      <span><i className="fa fa-edit"></i></span>
      <Header></Header>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
