import UrlForm from './components/UrlForm'
import Notification from './components/Notification'


const App = () => {
  return (
    <div>
      <h2>Bitly clone</h2>
      <p>Enter the URL you want to shorten</p>
      <UrlForm />
      <Notification />
    </div>
  )
}

export default App