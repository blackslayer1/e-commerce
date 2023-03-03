import './About.scss';
import Navbar from './Navbar';

const About = () => {
  return (
    <div className="about">
    <Navbar numberOfItems={0} />
    <div style={{position: "relative", top: '100px'}}>
    <h1>About Page</h1>
    <h3>Created using https://fakestoreapi.com/</h3>
    </div>
    </div>
  )
}

export default About
