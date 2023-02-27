import './Display.scss';
import watch from './display/watch.jpg';
import luggage from './display/luggage.jpg';
import firestick from './display/firestick.jpg';

const Display = ({text, img}: {text: string, img: number}) => {
  return (
    <div className="display">
      {
        img === 1 ? <img src={watch} alt={text} /> : img === 2 ? <img src={luggage} alt={text} /> : <img src={firestick} alt={text} />
      }
      <h1>{text}</h1>
    </div>
  )
}

export default Display
