import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../modules/addVoca'

function Home() {
  const voca = useSelector((state) => state.voca.value)
  const dispatch = useDispatch()
  
  return (
    <div className="Home">
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{voca}</span>
    </div>
  );
}

export default Home;
