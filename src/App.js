import './App.css';
import {LeasingCalculator} from "./LeasingCalculator";

function App() {
    return (
        <div className="App">
            <div className='block-header'>Рассчитайте стоимость <br/> автомобиля в лизинг</div>
            <LeasingCalculator />
        </div>
    );
}

export default App;
