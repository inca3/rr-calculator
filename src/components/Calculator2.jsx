import { useState } from "react";

export default function Calculator() {
  const [risk, setRisk] = useState();
  const [leverage, setLeverage] = useState(10);
  const [entry, setEntry] = useState();
  const [stop, setStop] = useState();
  const [tradeAmount, setTradeAmount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTradeAmount((risk * entry) / Math.abs(entry - stop));
  };
  return (
    <div className="min-w-[320px] w-[420px] bg-slate-200 p-8 rounded-md lg:shadow-xl">
      <h1 className="font-bold text-3xl">Easy RR Calculator</h1>
      <form
        noValidate
        className="mt-8 flex flex-col gap-y-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="risk" className="font-bold">
          Risk Amount ($)
        </label>
        <input
          type="number"
          name="risk"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="mb-4 p-1.5 rounded"
        />
        <label htmlFor="leverage" className="font-bold">
          Leverage ({leverage}x)
        </label>
        <input
          type="range"
          step={1}
          min={1}
          max={100}
          list="values"
          name="leverage"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
          className="mb-4 p-1.5 rounded"
        />
        <datalist id="values" className="">
          <option value="1" label="1x"></option>
          <option value="3" label="3x"></option>
          <option value="5" label="5x"></option>
          <option value="10" label="10x"></option>
          <option value="20" label="20x"></option>
          <option value="50" label="50x"></option>
          <option value="100" label="100x"></option>
        </datalist>
        <label htmlFor="entry" className="font-bold">
          Entry ($)
        </label>
        <input
          type="number"
          name="entry"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="mb-4 p-1.5 rounded"
        />
        <label htmlFor="stop" className="font-bold">
          Stop ($)
        </label>
        <input
          type="number"
          name="stop"
          value={stop}
          onChange={(e) => setStop(e.target.value)}
          className="mb-4 p-1.5 rounded"
        />
        <button type="submit" className="bg-slate-700 text-white py-3 rounded">
          Calculate
        </button>
      </form>
      <div className="font-bold text-xl mt-4">
        <p>Size: ${tradeAmount.toFixed(2)}</p>
        <p>Amount in Coins: {(tradeAmount / entry || 0).toFixed(2)}</p>
        <p className={tradeAmount / leverage < risk && "text-red-500"}>
          Amount you need: ${(tradeAmount / leverage).toFixed(2)}
        </p>
        {tradeAmount / leverage < risk && (
          <p className="font-normal text-red-500 text-sm">
            You need more capital to take this trade!
          </p>
        )}
      </div>
    </div>
  );
}
