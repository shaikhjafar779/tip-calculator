import { useEffect, useState } from 'react'
import styles from './CalculatorStyles.module.css'
const TipCalculator = () => {
    const [myInput, setMyInput] = useState('')
    const [tipAmount, setTipAmount] = useState('')
    const [finalTotal, setFinalTotal] = useState('')
    const [change, setChange] = useState(false)
    const [tipValue, setTipValue] = useState('')
    const [custInput, setCustInput] = useState('')
    const [changeCustom, setChangeCustom] = useState(true)

    const buttons = ['5%', '10%', '15%', '25%', '50%']
    const handleFormSubmit = (e) => {
        e.preventDefault()

    }
    const handleChange = (e) => {
        setMyInput(e.target.value)
        setFinalTotal(e.target.value)

    }
    useEffect(() => {
        if (!myInput) {
            setChangeCustom(true)
            setChange(false)
            setTipValue('')
            setCustInput('')
        }
    }, [myInput])
    const handleTipButton = (text) => {
        setTipAmount(text)
        const billAmount = parseFloat(myInput);
        const tipPercentage = parseFloat(text) / 100;
        const tip = billAmount * tipPercentage;
        const totalAmount = (billAmount + tip).toFixed(2);
        setFinalTotal(totalAmount)
        const tipB = (billAmount * tipPercentage).toFixed(2);
        setTipValue(tipB)
    }
    const handleReset = () => {
        setMyInput('')
        setTipAmount('')
        setFinalTotal('')
        setChangeCustom(true)
        setChange(false)
        setTipValue(false)
    }
    const hanleCustomBtn = () => {
        setChangeCustom(false)
        setChange(true)
    }
    const handleCustInput = (e) => {
        setCustInput(e.target.value)
        const value = e.target.value;
        const newTip = value / 100;
        const billAmount = parseFloat(myInput);
        const updatedTip = newTip * billAmount;
        const totaBill = billAmount + updatedTip;
        setTipValue(updatedTip.toFixed(2))
        setFinalTotal(totaBill.toFixed(2))
    }
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.box}`}>
                        <label htmlFor='bill'>Bill Amount</label>
                        <input
                            type='number'
                            id='bill'
                            placeholder='Enter Amount'
                            min={0}
                            value={myInput}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className={`${styles.select_tip}`}>
                            <label htmlFor='tip'>Select Tip %</label>
                            <div className={`${styles.tip}`}>
                                {buttons.map((tipText, index) => (
                                    <button key={index} id={index} type='button' disabled={!myInput} onClick={() => handleTipButton(tipText)}>{tipText}</button>))
                                }
                                {changeCustom ?
                                    <button
                                        type='button'
                                        disabled={!myInput}
                                        onClick={hanleCustomBtn}
                                    >Custom</button> : null
                                }
                                {change ?
                                    <input
                                        type='number'
                                        id={`${styles.custom}`}
                                        autoFocus={true}
                                        placeholder='Enter %'
                                        min={0}
                                        value={custInput}
                                        onChange={(e) => handleCustInput(e)} /> : null}

                            </div>
                        </div>
                    </div>
                    <div className={`${styles.box}`}>
                        <div className={`${styles.innerbox}`}>
                            <div className={`${styles.tipamount}`}>
                                <span>Tip Amount (Rs)</span>
                                {tipValue ? <p>{tipValue}</p> : <p>0.00</p>}
                            </div>

                            <div className={`${styles.tipamount}`}>
                                <span>Total Amount (Rs)</span>
                                {finalTotal ? <p>{finalTotal}</p> : <p>0.00</p>}
                            </div>

                            <button type='reset' className={`${styles.reset}`} disabled={!myInput} onClick={handleReset}>RESET</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default TipCalculator
